from sqlalchemy import Column, Integer, String  # type: ignore

from back.orm import Base


class User(Base):
    __tablename__ = "users"

    addr = Column(String, primary_key=True)
    name = Column(String)
    fullname = Column(String)
    nickname = Column(String)
    dateOfBirth = Column(Integer)
    aboutMe = Column(String)

    def __repr__(self):
        return f"User(addr='{self.addr}', name='{self.name}', fullname='{self.fullname}', nickname='{self.nickname}, dateOfBirth={self.dateOfBirth}, aboutMe={self.aboutMe}')"
