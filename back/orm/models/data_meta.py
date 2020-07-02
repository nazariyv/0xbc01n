from sqlalchemy import Column, Integer, String, Sequence  # type: ignore
from sqlalchemy.orm import relationship  # type: ignore

from back.orm.database import Base


class DataMeta(Base):
    __tablename__ = "users"

    id = Column(Integer, Sequence("id", start=1, increment=1), primary_key=True)
    name = Column(String)
    created = Column(Integer)

    author = relationship("User")

    bounties = relationship("Bounty", secondary="workers_bounties")
    submissions = relationship("SampleSubmission")

    # def __repr__(self):
    #     return f"DataMeta(addr='{self.addr}',name='{self.name}',fullname='{self.fullname}',nickname='{self.nickname},dob={self.dob},about_me={self.about_me}')"
