import json
import falcon  # type: ignore
import logging
from datetime import datetime
import time
from squid_py import Ocean
from ocean_utils.agreements.service_types import ServiceTypes
from ocean_keeper.utils import add_ethereum_prefix_and_hash_msg
from squid_py.brizo import BrizoProvider
from ocean_utils.agreements.service_agreement import ServiceAgreement
from squid_py.ocean.keeper import SquidKeeper as Keeper
from squid_py import ConfigProvider, Config

from back.orm.models.bounty import Bounty as BountyORM
from back.orm.models.user import User as UserORM
from back.orm.models.submission import Submission as SubmissionORM
from back.ocean import Oceaned, Metadata
from ocean_keeper.account import Account

l = logging.getLogger("api.submission")

ACC1_ADDR = "0xe2DD09d719Da89e5a3D0F2549c7E24566e947260"
ACC2_ADDR = "0xBE5449a6A97aD46c8558A3356267Ee5D2731ab5e"
ACC3_ADDR = "0xA78deb2Fa79463945C247991075E2a0e98Ba7A09"

# ! TODO: REMOVE THESE IN PROD. THESE ARE FROM SPREE SEED PHRASE. RUNNING OUT OF TIME THUS THEY ARE HERE
PKS = {
    ACC1_ADDR: 0xC594C6E5DEF4BAB63AC29EED19A134C130388F74F019BC74B8F4389DF2837A58,
    ACC2_ADDR: 0xEF4B441145C1D0F3B4BC6D61D29F5C6E502359481152F869247C7A4244D45209,
    ACC3_ADDR: 0x5D75837394B078CE97BC289FA8D75E21000573520BFA7784A9D28CCAAE602BF8,
}

# ! remove from here
CONFIG = {
    "keeper-contracts": {
        "keeper.url": "http://localhost:8545/",
        "keeper.path": "/.ocean/keeper-contracts/artifacts",
        "secret_store.url": "http://localhost:12001/",
        "parity.url": "http://localhost:8545/",
        "parity.address": "0x00bd138abd70e2f00903268f3db08f2d25677c9e",
        "parity.password": "node0",
        "parity.address1": "0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0",
        "parity.password1": "secret",
    },
    "resources": {
        "aquarius.url": "http://localhost:5000/",
        "brizo.url": "http://localhost:8030/",
        "provider.address": "0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0",
        "storage.path": "squid_py.db",
        "downloads.path": "consume-downloads",
    },
}


class Submission:
    def __init__(self, session):
        self.session = session

    def on_post(
        self, req: falcon.Request, resp: falcon.Response, bounty_id: int = None
    ):
        if not all(
            fld in req.media
            for fld in ["name", "addr", "full_dataset_url", "sample_url", "price"]
        ):
            resp.status = falcon.HTTP_400
            return

        addr = req.media["addr"]

        if not addr in [ACC1_ADDR, ACC2_ADDR, ACC3_ADDR]:
            l.warn(
                "this tool is an alpha version, and currently only supports the first three spree accounts"
            )
            resp.status = falcon.HTTP_400
            return

        if not bounty_id:
            resp.status = falcon.HTTP_400
            return

        usr_qry = self.session.query(UserORM).filter(UserORM.addr == str(addr))

        if not len(list(usr_qry)) == 1:
            resp.status = falcon.HTTP_500
            return

        bty_qry = self.session.query(BountyORM).filter(BountyORM.id == bounty_id)

        if not len(list(bty_qry)) == 1:
            resp.status = falcon.HTTP_500
            return

        bty = bty_qry.first()
        # usr = usr_qry.first()

        # ! TODO: in the future need to use usr to make submissions. not doing that now because don't know how keyfiles are generated in test.py

        created = datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")

        oceaned = Oceaned()

        # bounty hunter that has collected the data, is now publishing it
        # the url to it is encrypted
        # however, the bounty creator has access to the sample dataset
        # if he is satisfied with it, they can pay the price below, at which
        # point we transfer the ownership to bounty creator
        ddo = oceaned.register_asset(
            metadata=Metadata(
                name=req.media["name"],
                created=created,
                addr=addr,
                price=req.media["price"],
                full_url=req.media["full_dataset_url"],
                sample_url=req.media["sample_url"],
            ),
            publisher_account=Account(addr, private_key=PKS[addr]),
        )

        # !!!!! DO NOT ADD FULL URL HERE, IT MUST BE ENCRYPTED. THAT IS WHAT OCEAN PROTOCOL IS FOR
        # TODO: THIS CREATED IS NOT THE SAME AS THE ONE ABOVE THAT GOES INTO AQUARIUS
        new_submission = SubmissionORM(
            addr=addr,
            bounty_id=bty.id,
            created=int(time.time()),
            name=req.media["name"],
            price=req.media["price"],
            did=ddo.did,
            sample_url=req.media["sample_url"],
        )
        bty.submissions.append(new_submission)
        self.session.commit()

        resp.status = falcon.HTTP_201
        resp.body = json.dumps(ddo.did)


class BountySubmissions:
    def __init__(self, session):
        self.session = session

    def on_get(self, req: falcon.Request, resp: falcon.Response, bounty_id: int = None):
        if bounty_id is None:
            resp.status = falcon.HTTP_400
            return

        submissions = self.session.query(SubmissionORM).filter(
            SubmissionORM.bounty_id == bounty_id
        )

        all_subs = []

        for sub in submissions:
            resolved = sub.__dict__
            del resolved["_sa_instance_state"]
            l.debug(f"{resolved=}")
            all_subs.append(resolved)

        resp.status = falcon.HTTP_200
        resp.body = json.dumps(all_subs)


class PickWinner:
    def __init__(self, session):
        self.session = session

    def on_post(
        self,
        req: falcon.Request,
        resp: falcon.Response,
        bounty_id: int = None,
        submission_id: int = None,
    ):
        # this will make a request to get access to the full dataset after the payment has been made
        # url will be created and return in the reponse
        # * account is the account that has submitted the dataset

        if not bounty_id:
            resp.status = falcon.HTTP_400
            l.warn("bounty_id not supplied")
            return

        if not submission_id:
            resp.status = falcon.HTTP_400
            l.warn("submission_id not supplied")
            return

        if not "addr" in req.media:
            resp.status = falcon.HTTP_400
            l.warn("could not find consumer address in the request")
            return

        addr = req.media["addr"]

        submission_qry = self.session.query(SubmissionORM).filter(
            SubmissionORM.id == submission_id
        )

        if len(list(submission_qry)) != 1:
            resp.status = falcon.HTTP_400
            return

        submission = submission_qry.first()

        ConfigProvider.set_config(Config("", CONFIG))
        ocean = Ocean()
        l.info(f"{submission.did=}")
        ddo = ocean.assets.resolve(submission.did)

        # !!!!
        # !!! NOT CORRECT


        # ! in prod we would get a signature to confirm that consumer owns the consumer account
        # ! for this hack, I will just pull out the private key from the dict above ;)
        consumer_account = Account(addr, private_key=PKS[addr])
        publisher_addr = submission.addr
        publisher_account = Account(publisher_addr, private_key=PKS[publisher_addr])

        ocean.accounts.request_tokens(consumer_account, 1000)

        # * if I am guessing correctly, then we can make a METADATA service to pull the sample urls from aquarius, instead of storing it duplicately in our own db as well
        service = ddo.get_service(service_type=ServiceTypes.ASSET_ACCESS)

        service_agreement_id = ocean.assets.order(
            ddo.did, service.index, consumer_account, auto_consume=False
        )

        event_wait_time = 10
        # check if agreement to get access to data is created
        event = ocean.keeper.agreement_manager.subscribe_agreement_created(
            service_agreement_id, event_wait_time, None, (), wait=True
        )
        # if not event:
        #     resp.status = falcon.HTTP_400
        #     l.warn("escrow agreement not created")
        #     return

        #  check if the lock reward goes through
        event = ocean.keeper.lock_reward_condition.subscribe_condition_fulfilled(
            service_agreement_id, 120, None, (), wait=True
        )
        # if not event:
        #     resp.status = falcon.HTTP_400
        #     l.warn("conditions of the escrow not fulfilled")
        #     return

        brizo = BrizoProvider.get_brizo()
        sa = ServiceAgreement.from_ddo(ServiceTypes.ASSET_ACCESS, ddo)
        endpoint = sa.service_endpoint

        # ! once again, this needs to change for prod
        signature = Keeper.get_instance().sign_hash(
            add_ethereum_prefix_and_hash_msg(service_agreement_id), publisher_account
        )

        url = brizo._create_consume_url(
            service_endpoint=endpoint,
            agreement_id=service_agreement_id,
            account=consumer_account,
            signature=signature,
            index=0,
        )

        resp.status = falcon.HTTP_200
        resp.body = json.dumps(url)
