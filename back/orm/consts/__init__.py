from enum import Enum, auto


class Complexities(Enum):
    beginner = auto()
    intermediat = auto()
    advanced = auto()


class Tags(Enum):
    react = auto()
    go = auto()
    python = auto()
    cpp = auto()
    csharp = auto()
    c = auto()
    rust = auto()
    crypto = auto()
    stocks = auto()
    art = auto()
    medicine = auto()


class BountyTypes(Enum):
    contest = auto()
    traditional = auto()
    cooperative = auto()
