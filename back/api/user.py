import logging
import falcon  # type: ignore
import time
import json

from back.orm.utils import create_instance
from back.orm.user import User as UserORM

l = logging.getLogger("api.user")


class User:
    def __init__(self, session):
        self.session = session

    def on_put(self, req, resp):
        # pull user from db
        # if not in db, create, if validated
        # else not validated

        new_user = req.media
        l.debug(f"{new_user=}")

        # TODO: validate the new user here in the future, in fact, inside of create_instance
        user = create_instance(UserORM, new_user)
        user.created = int(time.time())
        l.debug(f"{user=}")

        # will commit to the db when flushed (automatically)
        self.session.add(user)

        resp.code = falcon.HTTP_200

    # TODO: unprotected at all at the moment, so anyone could just query it
    def on_get(self, req, resp):
        all_users = []

        for user in self.session.query(UserORM).order_by(UserORM.created):
            all_users.append(user.__to_dict())

        resp.body = json.dumps(all_users)
        resp.code = 200
