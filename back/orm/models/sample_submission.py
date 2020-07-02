from sqlalchemy import Column, String, Integer, ForeignKey  # type: ignore

from back.orm.database import Base


class Submission(Base):
    __tablename__ = "submissions"
    addr = Column(String, ForeignKey("users.addr"), primary_key=True)
    bounty_id = Column(Integer, ForeignKey("bounties.id"), primary_key=True)
    full_dataset_url = Column(String, nullable=False, unique=True)
    sample_url = Column(String, nullable=False, unique=True)

    def __repr__(self):
        return f"Submission(addr='{self.addr},bounty_id='{self.bounty_id}',full_dataset_url='{self.full_dataset_url}',sample_url='{self.sample_url}')"
