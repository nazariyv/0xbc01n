import time
import json
import uuid
import falcon  # type: ignore
import logging
from uuid import uuid4

from back.orm.utils import create_instance
from back.orm.bounty import Bounty as BountyORM
from back.orm.tags import Tag

l = logging.getLogger("api.bounty")


class Bounty:
    def __init__(self, session):
        self.session = session

    def on_put(
        self, req: falcon.Request, resp: falcon.Response, bounty_id: uuid.UUID = None
    ):
        if bounty_id:
            # check that this bounty is in the db
            qry = self.session.query(BountyORM).filter(BountyORM.id == str(bounty_id))
            tags = None

            if len(list(qry)) == 1:
                l.info(f"found the bounty in db, updating with {req.media}")

                # todo: validate the update
                # todo: I don't like how the names are hardcoded here, and what if I delete them in the orher place, how will I remember that I have to delte them here when the codebase grows
                completed = 0
                if "completed" in req.media:
                    completed = int(req.media["completed"])

                if "tags" in req.media:
                    tags = req.media["tags"].split(",")
                    del req.media["tags"]

                # TODO: there must be a better way to do this
                qry.update(
                    {**req.media, "completed": completed,}
                )

                if tags:
                    bty = qry.first()
                    for tag in tags:
                        l.debug(f"{tag=}")
                        # ! will throw if cannot convert. this is bad
                        bty.tags.append(Tag(tag=tag))

                self.session.commit()
                resp.code = falcon.HTTP_204
                return

        # if req has no query params, then generate a uuid
        # todo: check that this uuid is unique
        # ! prepend uuid with expiry, this way uuid is always unique AND we don't have to store expiry
        # and put the bounty into the db
        id_ = uuid4()
        new_bounty = req.media
        l.debug(f"{new_bounty=}")

        bounty = create_instance(BountyORM, new_bounty)
        bounty.id = str(id_)
        bounty.created = int(time.time())
        l.debug(f"{bounty=}")

        self.session.add(bounty)
        self.session.commit()

        resp.code = falcon.HTTP_201

    # should put delete behind authorization (i.e. only issuer and admins are allowed to call this) + conditions (like it is completed)
    # def on_delete(
    #     self, req: falcon.Request, resp: falcon.Response, bounty_id: uuid.UUID = None
    # ):
    #     if not bounty_id:
    #         l.info(f"nothing to delete, no {bounty_id} in the db")
    #         return

    #     # check that this bounty is in the db
    #     qry = self.session.query(BountyORM).filter(BountyORM.id == str(bounty_id))

    #     l.debug(f"{qry=}")
    #     l.debug(f"{list(qry)=}")

    #     if len(list(qry)) == 1:
    #         l.info(f"found the bounty in db, deleting")
    #         qry.delete()
    #         # self.session.commit()
    #         resp.code = falcon.HTTP_204

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
        resp.code = falcon.HTTP_200
