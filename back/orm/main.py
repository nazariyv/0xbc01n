# from back.orm.tags import DEFAULT as default_tags
from back.orm import session_scope, Base, engine
from back.orm.tags import create_table as create_tags_table


def main():
    with session_scope() as sesh:
        # need to create the tags table before the bounties, otherwise the association table cannot be created
        create_tags_table()

        Base.metadata.create_all(engine)

        # # TODO: find better way to do this
        # for tag in default_tags:
        #     sesh.add(tag)
