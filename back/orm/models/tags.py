from sqlalchemy import Column, Integer, Sequence, String  # type: ignore
from sqlalchemy.orm import relationship  # type: ignore

from back.orm.database import Base


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, Sequence("id", start=1, increment=1), primary_key=True)
    tag = Column(String, nullable=False, unique=True)
    bounties = relationship("Bounty", secondary="tags_bounties")

    def __repr__(self):
        return f"Tag(id='{self.id}',tag='{self.tag}',bounties='{repr(self.bounties)}')"


# DEFAULT = [Tag(tag=t.name) for t in Tags]


# 1. start work
# 2. sample submission
# 3. full submission
