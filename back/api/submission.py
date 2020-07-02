import json
import falcon  # type: ignore
import logging
from datetime import datetime
import time

from back.orm.models.bounty import Bounty as BountyORM
from back.orm.models.user import User as UserORM
from back.orm.models.submission import Submission as SubmissionORM
from back.ocean import Oceaned, Metadata

l = logging.getLogger("api.submission")


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

        if not bounty_id:
            resp.status = falcon.HTTP_400
            return

        usr_qry = self.session.query(UserORM).filter(UserORM.addr == str(req.media["addr"]))

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

        ddo = oceaned.register_asset(
            Metadata(
                name=req.media["name"],
                created=created,
                addr=req.media["addr"],
                price=req.media["price"],
                full_url=req.media["full_dataset_url"],
                sample_url=req.media["sample_url"],
            )
        )

        # !!!!! DO NOT ADD FULL URL HERE, IT MUST BE ENCRYPTED. THAT IS WHAT OCEAN PROTOCOL IS FOR
        # TODO: THIS CREATED IS NOT THE SAME AS THE ONE ABOVE THAT GOES INTO AQUARIUS
        new_submission = SubmissionORM(
            addr=req.media["addr"],
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

        if not qry_len == 1:
            l.warn("could not find such a user")
            resp.status = falcon.HTTP_400
            return

        all_subs = []

        for sub in submissions:
            resolved = sub.__dict__
            del resolved['_sa_instance_state']
            l.debug(f"{resolved=}")
            all_subs.append(resolved)

        resp.status = falcon.HTTP_200
        resp.body = json.dumps(all_subs)
