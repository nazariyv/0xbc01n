import os
import logging

from contextlib import contextmanager
from sqlalchemy import create_engine  # type: ignore
from sqlalchemy.orm import sessionmaker  # type: ignore
from sqlalchemy.ext.declarative import declarative_base  # type: ignore


l = logging.getLogger("back.orm")


curr_dir = os.path.dirname(os.path.realpath(__file__))
dir_up = os.path.dirname(curr_dir)

Base = declarative_base()
# ! do not change the name of the db, it is tied in docker
db_path = f"sqlite:///{os.path.join(dir_up, 'db')}"
l.info(f"{db_path=}")
engine = create_engine(db_path, echo=True)
# engine = create_engine("sqlite:///:memory:", echo=True)
Session = sessionmaker(bind=engine)


@contextmanager
def session_scope():
    """Provide a transactional scope around a series of operations."""
    session = Session()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
