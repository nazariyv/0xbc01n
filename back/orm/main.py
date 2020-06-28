from back.orm.user import create_table as create_user_table
from back.orm.bounty import create_table as create_bounty_table


def main():
    # TODO: change for proper db in the future
    # Base.metadata.create_all(engine)
    create_user_table()
    create_bounty_table()
