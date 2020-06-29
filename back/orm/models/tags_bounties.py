from sqlalchemy import Column, Integer, ForeignKey, String  # type: ignore

from back.orm.database import Base


class TagsBounties(Base):
    __tablename__ = "tags_bounties"
    bounty_id = Column(Integer, ForeignKey("bounties.id"), primary_key=True)
    tag = Column(String, ForeignKey("tags.tag"), primary_key=True)
