import falcon  # type: ignore


class User:
    def on_put(self, req, resp):
        # pull user from db
        # if not in db, create, if validated
        # else not validated
        # resp.status = falcon.HTTP_200
        # resp.body = json.dumps(["Beginner", "Intermediate", "Advanced"])
        ...
