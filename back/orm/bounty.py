from sqlalchemy import Column, Integer, String, Boolean, Enum  # type: ignore

from back.orm.consts import BountyTypes, Complexities
from back.orm import Base, engine


class Bounty(Base):
    __tablename__ = "bounties"

    id = Column(String, primary_key=True)
    title = Column(String)
    issuer = Column(String)
    price = Column(Integer)
    expiry = Column(Integer)
    created = Column(Integer)
    type = Column(Enum(BountyTypes))
    description = Column(String)
    short_description = Column(String)
    complexity = Column(Enum(Complexities))
    completed = Column(Boolean, default=0)

    def __repr__(self):
        return (
            f"Bounty(id='{self.id}',title='{self.title}',issuer='{self.issuer}',"
            f"price='{self.price}',expiry='{self.expiry}',type='{self.type}',"
            f"description='{self.description}',shortDescription='{self.short_description}',"
            f"complexity='{self.complexity}',completed='{self.completed}')"
        )


def create_table():
    Base.metadata.create_all(engine)
