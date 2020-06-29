import logging
import falcon  # type: ignore
import time
import json

from back.orm.utils import create_instance
from back.orm.models.user import User as UserORM

l = logging.getLogger("api.user")


class User:
    def __init__(self, session):
        self.session = session

    def on_put(self, req, resp, user_addr: str = None):
        if user_addr:
            qry = self.session.query(UserORM).filter(UserORM.addr == user_addr)
            if len(list(qry)) == 1:
                qry.update(req.media)
                self.session.commit()
                resp.code = falcon.HTTP_204
                return

        new_user = req.media
        l.debug(f"{new_user=}")

        # TODO: validate the new user here in the future, in fact, inside of create_instance
        user = create_instance(UserORM, new_user)
        user.created = int(time.time())
        l.debug(f"{user=}")

        # will commit to the db when flushed (automatically)
        self.session.add(user)
        self.session.commit()

        resp.code = falcon.HTTP_201

    # TODO: unprotected at all at the moment, so anyone could just query it
    def on_get(self, req, resp):
        all_users = []

        for user in self.session.query(UserORM).order_by(UserORM.created):
            l.debug(f"{user=}")

            u = user.__dict__
            del u["_sa_instance_state"]
            all_users.append(user.__dict__)

        resp.body = json.dumps(all_users)
        resp.code = falcon.HTTP_200
