import falcon  # type: ignore
import json

from back.orm.consts import Complexities, BountyTypes as BTs

all_complexities = json.dumps([c.name for c in Complexities])
all_bounty_types = json.dumps([b.name for b in BTs])


class ComplexityOptions:
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.body = all_complexities


class BountyTypes:
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.body = all_bounty_types


__all__ = ["ComplexityOptions", "BountyTypes"]
