#!/usr/bin/env python
from sqlalchemy import create_engine  # type: ignore

from back.orm import Base


def main():
    # TODO: change for proper db in the future
    engine = create_engine("mysql:///:memory:", echo=True)

    Base.metadata.create_all(engine)


if __name__ == "__main__":
    main()
