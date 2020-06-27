#!/usr/bin/env python
import falcon  # type: ignore

from back.api.web import ComplexityOptions, Tags
from back.orm.main import main as init_db

init_db()

app = falcon.API()

co = ComplexityOptions()
t = Tags()

app.add_route("/api/web/complexityOptions", co)
app.add_route("/api/web/tags", t)
