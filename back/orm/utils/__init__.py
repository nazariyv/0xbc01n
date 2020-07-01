from typing import Dict

# TODO: missing mypy types
def create_instance(cls, json_repr: Dict):
    c = cls()

    for k, v in json_repr.items():
        if hasattr(cls, k):
            setattr(c, k, v)

    return c


def all_natural_numbers():
    n = 0
    while True:
        n += 1
        yield n


__all__ = ["create_instance", "all_natural_numbers"]
