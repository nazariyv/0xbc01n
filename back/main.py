#!/usr/bin/env python
import falcon  # type: ignore

from back.api.user import User
from back.api.bounty import Bounty
from back.api.web import ComplexityOptions, Tags
from back.orm.main import main as init_db

init_db()

from back.orm.database import session_scope

app = falcon.API()
co = ComplexityOptions()
t = Tags()

# TODO: everything that needs session goes here
# TODO: session is NOT thread-safe
with session_scope() as session:
    u = User(session=session)
    b = Bounty(session=session)

app.add_route("/api/web/complexityOptions", co)
app.add_route("/api/web/tags", t)
app.add_route("/api/user", u)
app.add_route("/api/bounty", b)
app.add_route("/api/bounty/{bounty_id:uuid}", b)
