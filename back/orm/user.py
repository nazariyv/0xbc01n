from sqlalchemy import Column, Integer, String  # type: ignore

from back.orm import Base, engine


class User(Base):
    __tablename__ = "users"

    addr = Column(String, primary_key=True)
    created = Column(Integer)
    name = Column(String)
    fullname = Column(String)
    nickname = Column(String)
    dateOfBirth = Column(Integer)
    aboutMe = Column(String)

    def __repr__(self):
        return f"User(addr='{self.addr}', name='{self.name}', fullname='{self.fullname}', nickname='{self.nickname}, dateOfBirth={self.dateOfBirth}, aboutMe={self.aboutMe}')"


def create_table():
    Base.metadata.create_all(engine)
