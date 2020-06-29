import logging

# from back.orm.tags import DEFAULT as default_tags
from back.orm.database import session_scope, Base, engine

l = logging.getLogger("orm.main")


def main():
    with session_scope() as sesh:
        # need to create the tags table before the bounties, otherwise the association table cannot be created
        # todo: does this need to be here? I have it here only because bounties_tags ref table needs tags first
        # create_tags_table()

        Base.metadata.bind = engine
        l.debug(f"{Base.metadata=}")
        l.debug(f"{dir(Base.metadata)=}")
        l.debug(f"{Base.metadata.tables=}")

        # * remove the below for production (the drop all one)
        Base.metadata.drop_all(engine)
        Base.metadata.create_all(engine)

        # # TODO: find better way to do this
        # for tag in default_tags:
        #     sesh.add(tag)
