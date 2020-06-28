from sqlalchemy import Column, Integer, String, Boolean, Enum, Table, ForeignKey  # type: ignore
from sqlalchemy.orm import relationship  # type: ignore

from back.orm.consts import BountyTypes, Complexities, Tags
from back.orm import Base

bounty_tag_association_table = Table(
    "bounty_tag_association_table",
    Base.metadata,
    Column("bounty_id", String, ForeignKey("bounties.id")),
    Column("tag", Enum(Tags), ForeignKey("tags.tag")),
)


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
    tags = relationship("Tag", secondary=bounty_tag_association_table)

    def __repr__(self):
        return (
            f"Bounty(id='{self.id}',title='{self.title}',issuer='{self.issuer}',"
            f"price='{self.price}',expiry='{self.expiry}',type='{self.type}',"
            f"desc='{self.desc}',short_desc='{self.short_desc}',"
            f"complexity='{self.complexity}',completed='{self.completed}')"
        )
