# from sqlalchemy import Column, Integer, Sequence, Enum  # type: ignore

# from back.orm.consts import Complexities
# from back.orm import Base


# class Complexity(Base):
#     __tablename__ = "complexities"

#     id = Column(Integer, Sequence("id", start=1, increment=1), primary_key=True)
#     complexity = Column(Enum(Complexities))

#     def __repr__(self):
#         return f"Complexity(id='{self.id}',complexity='{self.complexity}')"


# DEFAULT = [Complexity(complexity=c.name) for c in Complexities]
