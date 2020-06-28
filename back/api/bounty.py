import time
import json
import falcon  # type: ignore
import logging
from uuid import uuid4
from sqlalchemy import update  # type: ignore

from back.orm.utils import create_instance
from back.orm.bounty import Bounty as BountyORM


l = logging.getLogger("api.bounty")


class Bounty:
    def __init__(self, session):
        self.session = session

    def on_put(self, req, resp):
        # if req has params, then update the record if record in db and update is valid
        if req.params:
            if "id" in req.params:
                # check that this bounty is in the db
                if (
                    len(
                        self.session.query(BountyORM).filter(
                            BountyORM.id == req.params["id"]
                        )
                    )
                    == 1
                ):
                    # todo: validate the update
                    update(BountyORM).where(BountyORM.id == req.params["id"]).values(
                        **req.media
                    )
                    resp.code = falcon.HTTP_200
                    return

        # if req has no query params, then generate a uuid
        # todo: check that this uuid is unique
        # ! prepend uuid with expiry, this way uuid is always unique AND we don't have to store expiry
        # and put the bounty into the db
        id = uuid4()
        new_bounty = req.media
        l.debug(f"{new_bounty=}")

        bounty = create_instance(BountyORM, new_bounty)
        bounty.id = str(id)
        bounty.created = int(time.time())
        l.debug(f"{bounty=}")

        self.session.add(bounty)

        resp.code = falcon.HTTP_200

    def on_get(self, req, resp):
        all_bounties = []

        for bounty in self.session.query(BountyORM).order_by(BountyORM.created):
            l.debug(f"{bounty=}")

            b = bounty.__dict__
            del b["_sa_instance_state"]
            all_bounties.append(bounty.__dict__)

        resp.body = json.dumps(all_bounties)
        resp.code = falcon.HTTP_200
