from sqlalchemy import Column, String, Integer, ForeignKey  # type: ignore

from back.orm.database import Base


class Submission(Base):
    __tablename__ = "submissions"
    addr = Column(String, ForeignKey("users.addr"), primary_key=True)
    bounty_id = Column(Integer, ForeignKey("bounties.id"), primary_key=True)
    created = Column(Integer)
    name = Column(String)
    price = Column(Integer, nullable=False)
    did = Column(String, nullable=False, unique=True)

    def __repr__(self):
        return (
            f"Submission(name='{self.name}',addr='{self.addr}',bounty_id='{self.bounty_id}',did='{self.did}')"
        )
