from sqlalchemy import Column, String, Integer, ForeignKey  # type: ignore

from back.orm.database import Base


class SampleSubmission(Base):
    __tablename__ = "sample_submissions"
    addr = Column(String, ForeignKey("users.addr"), primary_key=True)
    bounty_id = Column(Integer, ForeignKey("bounties.id"), primary_key=True)
    ipfs_url = Column(String, nullable=False, unique=True)
    comment = Column(String)

    def __repr__(self):
        return f"SampleSubmission(addr='{self.addr}',bounty_id='{self.bounty_id}',ipfs_url='{self.ipfs_url}',comment='{self.comment}')"
