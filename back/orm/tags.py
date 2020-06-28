from sqlalchemy import Column, Integer, Sequence, Enum  # type: ignore

from back.orm.consts import Tags
from back.orm import Base, engine


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, Sequence("id", start=1, increment=1), primary_key=True)
    tag = Column(Enum(Tags))

    def __repr__(self):
        return f"Tag(id='{self.id}',tag='{self.tag}')"


def create_table():
    Base.metadata.create_all(engine)


# DEFAULT = [Tag(tag=t.name) for t in Tags]


# 1. start work
# 2. sample submission
# 3. full submission
