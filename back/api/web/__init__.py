import falcon
import json


class ComplexityOptions:
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(["Beginner", "Intermediate", "Advanced"])


class Tags:
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(
            [
                "react",
                "go",
                "python",
                "C++",
                "C#",
                "C",
                "Rust",
                "crypto",
                "stocks",
                "art",
                "medicine",
            ]
        )


__all__ = ["ComplexityOptions", "Tags"]
