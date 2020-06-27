from sqlalchemy import create_engine  # type: ignore

from back.orm import Base


def main():
    # TODO: change for proper db in the future
    engine = create_engine(
        "mysql+mysqldb://<user>:<password>@<host>[:<port>]/<dbname>", echo=True
    )

    Base.metadata.create_all(engine)
