from sqlalchemy import create_engine  # type: ignore
from sqlalchemy.ext.declarative import declarative_base  # type: ignore

Base = declarative_base()
engine = create_engine("sqlite:///:memory:", echo=True)
