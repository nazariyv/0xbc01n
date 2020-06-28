from sqlalchemy import Column, Integer, String  # type: ignore

from back.orm import Base, engine


class Bounty(Base):
    __tablename__ = "bounties"

    id = Column(String, primary_key=True)
    title = Column(String)
    issuer = Column(String)
    price = Column(Integer)
    expiry = Column(Integer)
    created = Column(Integer)
    type = Column(String)
    description = Column(String)
    shortDescription = Column(String)
    complexity = Column(String)

    def __repr__(self):
        return (
            f"Bounty(id='{self.id}',title='{self.title}',issuer='{self.issuer}',"
            f"price='{self.price}',expiry='{self.expiry}',type='{self.type}',"
            f"description='{self.description}',shortDescription='{self.shortDescription}',"
            f"complexity='{self.complexity}')"
        )


def create_table():
    Base.metadata.create_all(engine)
