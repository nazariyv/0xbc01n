from sqlalchemy import Column, String, ForeignKey  # type: ignore

from back.orm.database import Base


class WorkersBounties(Base):
    __tablename__ = "workers_bounties"
    bounty_id = Column(String, ForeignKey("bounties.id"), primary_key=True)
    worker_id = Column(String, ForeignKey("users.addr"), primary_key=True)
