from sqlalchemy import Column, String, Integer, ForeignKey, Sequence  # type: ignore

from back.orm.database import Base


class Submission(Base):
    __tablename__ = "submissions"
    id = Column(Integer, Sequence("id", start=1, increment=1), primary_key=True, autoincrement=True)
    addr = Column(String, ForeignKey("users.addr"))
    bounty_id = Column(Integer, ForeignKey("bounties.id"))
    created = Column(Integer)
    name = Column(String)
    price = Column(Integer, nullable=False)
    did = Column(String, nullable=False, unique=True)

    def __repr__(self):
        return (
            f"Submission(name='{self.name}',addr='{self.addr}',"
            f"bounty_id='{self.bounty_id}',did='{self.did}')"
        )
