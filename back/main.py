#!/usr/bin/env python
import falcon

from web import ComplexityOptions, Tags


def main():
    app = falcon.API()

    co = ComplexityOptions()
    t = Tags()

    app.add_route("/api/web/complexityOptions", co)
    app.add_route("/api/web/tags", t)


if __name__ == "__main__":
    main()
