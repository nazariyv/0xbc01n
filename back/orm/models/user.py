from sqlalchemy import Column, Integer, String  # type: ignore
from sqlalchemy.orm import relationship  # type: ignore

from back.orm.database import Base


class User(Base):
    __tablename__ = "users"

    addr = Column(String, primary_key=True)
    created = Column(Integer)
    name = Column(String)
    fullname = Column(String)
    nickname = Column(String)
    dob = Column(Integer)
    about_me = Column(String)
    bounties = relationship("Bounty", secondary="workers_bounties")

    def __repr__(self):
        return f"User(addr='{self.addr}', name='{self.name}', fullname='{self.fullname}', nickname='{self.nickname}, dob={self.dob}, about_me={self.about_me}')"
