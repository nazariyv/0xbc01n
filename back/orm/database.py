import os
import logging

from sqlalchemy import create_engine  # type: ignore
from sqlalchemy.orm import sessionmaker  # type: ignore
from sqlalchemy.ext.declarative import declarative_base  # type: ignore
from contextlib import contextmanager


l = logging.getLogger("back.orm")


Base = declarative_base()
db_path = f"sqlite:///{os.path.expanduser('~/ocean-data-boutny.db')}"
l.info(f"{db_path=}")
engine = create_engine(db_path)
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
