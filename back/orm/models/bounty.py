from sqlalchemy import Column, Integer, String, Boolean, Enum  # type: ignore
from sqlalchemy.orm import relationship  # type: ignore

from back.orm.consts import BountyTypes, Complexities
from back.orm.database import Base


class Bounty(Base):
    __tablename__ = "bounties"

    id = Column(String, primary_key=True)
    title = Column(String)
    issuer = Column(String)
    price = Column(Integer)
    expiry = Column(Integer)
    created = Column(Integer)
    type = Column(Enum(BountyTypes))
    desc = Column(String)
    short_desc = Column(String)
    complexity = Column(Enum(Complexities))
    completed = Column(Boolean, default=0)
    tags = relationship("Tag", secondary="tags_bounties")
    workers = relationship("User", secondary="workers_bounties")

    def __repr__(self):
        return (
            f"Bounty(id='{self.id}',title='{self.title}',issuer='{self.issuer}',"
            f"price='{self.price}',expiry='{self.expiry}',type='{self.type}',"
            f"desc='{self.desc}',short_desc='{self.short_desc}',"
            f"complexity='{self.complexity}',completed='{self.completed}')"
        )
