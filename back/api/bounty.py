import time
import json
import falcon  # type: ignore
import logging
from datetime import datetime
from sqlalchemy.exc import IntegrityError  # type: ignore

from back.orm.utils import create_instance
from back.orm.models.bounty import Bounty as BountyORM
from back.orm.models.tags import Tag as TagORM
from back.orm.models.user import User as UserORM

from back.ocean import Oceaned, Metadata

l = logging.getLogger("api.bounty")


class Bounty:
    def __init__(self, session):
        self.session = session

    def on_put(self, req: falcon.Request, resp: falcon.Response, bounty_id: int = None):
        if bounty_id:
            # check that this bounty is in the db
            qry = self.session.query(BountyORM).filter(BountyORM.id == bounty_id)
            tags = None

            if len(list(qry)) == 1:
                l.info(f"found the bounty in db, updating with {req.media}")

                # todo: validate the update
                # todo: I don't like how the names are hardcoded here, and what if I delete them in the orher place, how will I remember that I have to delte them here when the codebase grows
                if "tags" in req.media:
                    if "," in req.media["tags"]:
                        tags = req.media["tags"].split(",")
                    else:
                        tags = [req.media["tags"].strip().lower()]
                    del req.media["tags"]

                qry.update(req.media)

                if tags:
                    bty = qry.first()
                    for tag in tags:
                        if not tag:
                            continue
                        l.debug(f"{tag=}")
                        # ! will throw if cannot convert. this is bad
                        bty.tags.append(TagORM(tag=tag))

                try:
                    self.session.commit()
                except IntegrityError:
                    self.session.rollback()

                resp.status = falcon.HTTP_204
                return

        # if req has no query params, then generate a uuid
        # todo: check that this uuid is unique
        # ! prepend uuid with expiry, this way uuid is always unique AND we don't have to store expiry
        # and put the bounty into the db
        new_bounty = req.media
        l.debug(f"{new_bounty=}")

        bounty = create_instance(BountyORM, new_bounty)
        bounty.created = int(time.time())
        l.debug(f"{bounty=}")

        self.session.add(bounty)
        self.session.commit()

        resp.status = falcon.HTTP_201

    def on_get(self, req: falcon.Request, resp: falcon.Response):
        all_bounties = []

        for bounty in self.session.query(BountyORM).order_by(BountyORM.created):
            l.debug(f"{bounty=}")

            b = bounty.__dict__
            del b["_sa_instance_state"]
            # ! hardcoding is not great
            b["complexity"] = str(b["complexity"])
            b["type"] = str(b["type"])

            all_bounties.append(bounty.__dict__)

        resp.body = json.dumps(all_bounties)
        resp.status = falcon.HTTP_200


class BountyStartWork:
    def __init__(self, session):
        self.session = session

    def on_post(self, req: falcon.Request, resp: falcon.Response, bounty_id: int):
        qry = self.session.query(BountyORM).filter(BountyORM.id == bounty_id)
        qry_len = len(list(qry))

        if not qry_len == 1:
            l.warn("could not find such a user")
            resp.status = falcon.HTTP_400
            return

        bounty = qry.first()

        if "addr" not in req.media:
            l.warn(
                "could not find user address in the json body of the request, add it"
            )
            resp.status = falcon.HTTP_400
            return

        # find user and then add it to the bounty
        usr_qry = self.session.query(UserORM).filter(
            UserORM.addr == str(req.media["addr"])
        )
        usr_qry_len = len(list(usr_qry))

        if not usr_qry_len == 1:
            l.warn(f"could not find user associated with the addr: {req.media['addr']}")
            resp.status = falcon.HTTP_400
            return

        usr = usr_qry.first()

        bounty.workers.append(usr)
        self.session.commit()
        resp.status = falcon.HTTP_204
