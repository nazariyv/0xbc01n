#!/usr/bin/env python
import falcon  # type: ignore

from back.api.user import User
from back.api.workers_bounties import WorkersBounties
from back.api.bounty import Bounty, BountyStartWork, BountySampleSubmission
from back.api.web import ComplexityOptions, BountyTypes
from back.orm.main import main as init_db

init_db()

from back.orm.database import session_scope

app = falcon.API()
co = ComplexityOptions()
bt = BountyTypes()

# TODO: everything that needs session goes here
# TODO: session is NOT thread-safe
with session_scope() as session:
    u = User(session=session)
    b = Bounty(session=session)
    bsw = BountyStartWork(session=session)
    bss = BountySampleSubmission(session=session)
    wb = WorkersBounties(session=session)

app.add_route("/api/web/complexity_options", co)
app.add_route("/api/web/bounty_types", bt)
app.add_route("/api/user", u)
app.add_route("/api/user/{user_addr}", u)
app.add_route("/api/user/{user_addr}/works_bounties", wb)
app.add_route("/api/bounty", b)
app.add_route("/api/bounty/{bounty_id:int}", b)
app.add_route("/api/bounty/{bounty_id:int}/start_work", bsw)
app.add_route("/api/bounty/{bounty_id:int}/submit_sample", bss)
