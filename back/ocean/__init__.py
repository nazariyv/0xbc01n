# from ocean_keeper.utils import get_account
import uuid
import json
from typing import Dict
from ocean_keeper.account import Account  # type: ignore
from squid_py import Ocean, ConfigProvider, Config  # type: ignore
from dotenv import load_dotenv  # type: ignore

load_dotenv()


def Metadata(
    name: str, created: str, addr: str, price: int, full_url: str, sample_url: str
) -> Dict:
    # sample goes into the links section in the additionalInformation
    # https://github.com/oceanprotocol/squid-js/blob/master/src/ddo/MetaData.ts#L212
    return {
        "main": {
            "name": name,
            "dateCreated": created,
            "author": addr,
            "license": "Public Domain",
            "price": str(price),
            "files": [
                {
                    "index": 0,
                    "contentType": "text/text",
                    "checksumType": "MD5",
                    "checksum": str(uuid.uuid4()),
                    # "contentLength": "12057507",
                    "url": full_url,
                }
            ],
            "type": "dataset",
        },
        "additionalInformation": {"links": [{"url": sample_url},],},
    }


class Oceaned:
    def __init__(self):
        config_dict = dict()
        with open("/back/ocean/config.json", "r") as f:
            config_dict = json.loads(f.read())
        ConfigProvider.set_config(Config("", config_dict))
        self.ocean = Ocean()

    def register_asset(self, metadata, publisher_account: Account):
        ddo = self.ocean.assets.create(
            metadata,
            publisher_account,
            providers=["0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0"],
            # owner_address=publisher_account.address,
            use_secret_store=False,
        )
        return ddo
