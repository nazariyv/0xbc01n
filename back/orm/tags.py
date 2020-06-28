from sqlalchemy import Column, Integer, String, Sequence  # type: ignore

from back.orm import Base, engine


class Tag(Base):
    __tablename__ = "tags"

    id = Column(
        Integer, sequence=Sequence("id", start=1, increment=1), primary_key=True
    )
    tag = Column(String)

    def __repr__(self):
        return f"Tag(id='{self.id}',tag='{self.tag}')"


def create_table():
    Base.metadata.create_all(engine)
