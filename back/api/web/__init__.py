import falcon  # type: ignore
import json

from back.orm.consts import Complexities, Tags as TagsE, BountyTypes

all_complexities = json.dumps([c.name for c in Complexities])
all_tags = json.dumps([t.name for t in TagsE])
all_bounty_types = json.dumps([b.name for b in BountyTypes])


class ComplexityOptions:
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.body = all_complexities


class Tags:
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.body = all_tags


class BountyType:
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.body = all_bounty_types


__all__ = ["ComplexityOptions", "Tags", "BountyType"]
