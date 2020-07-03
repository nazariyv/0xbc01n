import json
import falcon  # type: ignore
import logging
from datetime import datetime
import time

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
            l.warn("this tool is an alpha version, and currently only supports the first three spree accounts")
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
            created=time.time(),
            name=req.media["name"],
            price=req.media["price"],
            did=ddo.did,
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

        submissions = self.session.query(SubmissionORM).filter(SubmissionORM.bounty_id == bounty_id)
        qry_len = len(list(submissions))

        all_subs = []

        for sub in submissions:
            resolved = sub.__dict__
            del resolved['_sa_instance_state']
            l.debug(f"{resolved=}")
            all_subs.append(resolved)

        resp.status = falcon.HTTP_200
        resp.body = json.dumps(all_subs)
