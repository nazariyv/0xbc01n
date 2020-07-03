#!/usr/bin/env python
import falcon  # type: ignore

from back.api.user import User
from back.api.workers_bounties import WorkersBounties
from back.api.bounty import Bounty, BountyStartWork
from back.api.web import ComplexityOptions, BountyTypes
from back.api.submission import Submission, BountySubmissions, PickWinner
from back.orm.main import main as init_db

init_db()

from back.orm.database import session_scope

app = falcon.API()
co = ComplexityOptions()
bt = BountyTypes()

# * everything that needs session goes here
# ! session is NOT thread-safe
with session_scope() as session:
    u = User(session=session)
    b = Bounty(session=session)
    bsw = BountyStartWork(session=session)
    wb = WorkersBounties(session=session)
    s = Submission(session=session)
    bs = BountySubmissions(session=session)
    pw = PickWinner(session=session)

app.add_route("/api/web/complexity_options", co)
app.add_route("/api/web/bounty_types", bt)

app.add_route("/api/user", u)
app.add_route("/api/user/{user_addr}", u)
app.add_route("/api/user/{user_addr}/works_bounties", wb)

app.add_route("/api/bounty", b)
app.add_route("/api/bounty/{bounty_id:int}", b)
app.add_route("/api/bounty/{bounty_id:int}/start_work", bsw)
app.add_route("/api/bounty/{bounty_id:int}/fulfill", s)
# ! TODO: need to hide this behind authorization
app.add_route("/api/bounty/{bounty_id:int}/submissions", bs)
app.add_route("/api/bounty/{bounty_id:int}/submission/{submission_id:int}/is_winner", pw)
