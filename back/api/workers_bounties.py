import falcon
import json
import logging

from back.orm.models.workers_bounties import WorkersBounties as WorkersBountiesORM

l = logging.getLogger("api.workers_bounties")


class WorkersBounties:
    def __init__(self, session):
        self.session = session

    def on_get(self, req, resp, user_addr: str = None):
        if not user_addr:
            l.warning("url of the request does not contain the user address")
            return

        all_worked_bounties = self.session.query(WorkersBountiesORM).filter(
            WorkersBountiesORM.worker_id == user_addr
        )

        all_of_them = []

        for bounty in all_worked_bounties:
            resolved = bounty.__dict__
            del resolved["_sa_instance_state"]
            l.debug(f"{resolved=}")
            all_of_them.append(resolved)

        resp.body = json.dumps(all_of_them)
        resp.status = falcon.HTTP_200
