from sqlalchemy import Column, String, ForeignKey, Enum  # type: ignore

from back.orm.database import Base
from back.orm.consts import Tags


class TagsBounties(Base):
    __tablename__ = "tags_bounties"
    bounty_id = Column(String, ForeignKey("bounties.id"), primary_key=True)
    tag = Column(Enum(Tags), ForeignKey("tags.tag"), primary_key=True)
