import time
import json
import falcon  # type: ignore
import logging
from sqlalchemy.exc import IntegrityError  # type: ignore

from back.orm.utils import create_instance
from back.orm.models.bounty import Bounty as BountyORM
from back.orm.models.tags import Tag as TagORM
from back.orm.models.user import User as UserORM
from back.orm.models.sample_submission import SampleSubmission as SampleSubmissionORM

l = logging.getLogger("api.bounty_submit")

# keeper.path should point to the artifact folder which is assumed
# here to be the default path created by barge
config_dict = {
    "keeper-contracts": {
        # Point to an Ethereum RPC client. Note that Squid learns the name of
        # the network to work with from this client.
        "keeper.url": "http://localhost:8545",
        # Specify the keeper contracts artifacts folder (has the smart
        # contracts definitions json files). When you
        # install the package, the artifacts are automatically picked
        # up from the `keeper-contracts` Python
        # dependency unless you are using a local ethereum network.
        "keeper.path": "~/.ocean/keeper-contracts/artifacts",
        "secret_store.url": "http://localhost:12001",
        "parity.url": "http://localhost:8545",
        "parity.address": "0x00bd138abd70e2f00903268f3db08f2d25677c9e",
        "parity.password": "node0",
        "parity.address1": "0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0",
        "parity.password1": "secret",
    },
    "resources": {
        # aquarius is the metadata store. It stores the assets DDO/DID-document
        "aquarius.url": "http://localhost:5000",
        # Brizo is the publisher's agent. It serves purchase and requests
        # for both data access and compute services
        "brizo.url": "http://localhost:8030",
        # points to the local database file used for storing temporary
        # information (for instance, pending service agreements).
        "storage.path": "squid_py.db",
        # Where to store downloaded asset files
        "downloads.path": "consume-downloads",
    },
}


class BountySubmit:
    def __init__(self, session):
        self.session = session

    def on_post(self, req: falcon.Request, resp: falcon.Response, bounty_id: int):
        # if not "ipfs_url" in req.media:
        #     l.warn("failed because no ipfs url in json body")
        #     resp.status = falcon.HTTP_400
        #     return

        qry = self.session.query(BountyORM).filter(BountyORM.id == bounty_id)
        qry_len = len(list(qry))

        if not qry_len == 1:
            l.warn("could not find such a user")
            resp.status = falcon.HTTP_400
            return

        bounty = qry.first()

        # if "addr" not in req.media:
        #     l.warn(
        #         "could not find user address in the json body of the request, add it"
        #     )
        #     resp.status = falcon.HTTP_400
        #     return

        # submission = SampleSubmissionORM(
        #     bounty_id=bounty_id,
        #     addr=req.media["addr"],
        #     ipfs_url=req.media["ipfs_url"],
        #     comment="" if not "comment" in req.media else str(req.media["comment"]),
        # )

        # bounty.sample_submissions.append(submission)
        # self.session.commit()
        # resp.status = falcon.HTTP_204
