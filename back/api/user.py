import logging
import falcon  # type: ignore

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
        l.debug(f"{user=}")

        self.session.add(user)

        resp.code = falcon.HTTP_200
