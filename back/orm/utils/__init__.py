from typing import Dict

# TODO: missing pylint types
def create_instance(cls, json_repr: Dict):
    c = cls()

    for k, v in json_repr.items():
        if hasattr(cls, k):
            setattr(c, k, v)

    return c


__all__ = ["create_instance"]
