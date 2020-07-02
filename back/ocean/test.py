#!/usr/bin/env python
import os
import time
import uuid
from dotenv import load_dotenv
from web3 import Web3
from ocean_keeper.account import Account

load_dotenv()

from ocean_keeper.utils import get_account
from ocean_keeper.contract_handler import ContractHandler

from squid_py.ocean.keeper import SquidKeeper as Keeper
from squid_py import Ocean, ConfigProvider, Config
from squid_py.brizo import BrizoProvider
from ocean_utils.agreements.service_types import ServiceTypes
from ocean_keeper.utils import add_ethereum_prefix_and_hash_msg
from ocean_utils.agreements.service_agreement import ServiceAgreement


config_dict = {
    "keeper-contracts": {
        "keeper.url": "http://localhost:8545/",
        "keeper.path": "~/.ocean/keeper-contracts/artifacts",
        "secret_store.url": "http://localhost:12001/",
        "parity.url": "http://localhost:8545/",
        "parity.address": "0x00bd138abd70e2f00903268f3db08f2d25677c9e",
        "parity.password": "node0",
        "parity.address1": "0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0",
        "parity.password1": "secret",
    },
    "resources": {
        "aquarius.url": "http://172.15.0.15:5000/",
        "brizo.url": "http://localhost:8030/",
        "provider.address": "0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0",
        "storage.path": "squid_py.db",
        "downloads.path": "consume-downloads",
    },
}


metadata = {
    "main": {
        "name": "Ocean protocol white paper",
        "dateCreated": "2012-02-01T10:55:11Z",
        "author": "Mario",
        # "license": "CC0: Public Domain",
        "price": "0",
        "files": [
            {
                "index": 0,
                "contentType": "text/text",
                "checksum": str(uuid.uuid4()),
                "checksumType": "MD5",
                "contentLength": "12057507",
                "url": "https://raw.githubusercontent.com/oceanprotocol/barge/master/README.md",
            }
        ],
        "type": "dataset",
    }
}

ConfigProvider.set_config(Config("", config_dict))

ocean = Ocean()

print(ContractHandler.artifacts_path)

config = ocean.config

account = get_account(0)  # use if env vars are declared
# consumer_account = get_account(1)  # PARITY_ADDRESS1 PARITY_KEYFILE1 & PARITY_PASSWORD1

# consumer_account = 0x00bd138abd70e2f00903268f3db08f2d25677c9e

name = 'PARITY_ADDRESS'
pswrd_name = 'PARITY_PASSWORD'
key_name = 'PARITY_KEY'
encrypted_key_name = 'PARITY_ENCRYPTED_KEY'
keyfile_name = 'PARITY_KEYFILE'
address = "0x00bd138abd70e2f00903268f3db08f2d25677c9e"
pswrd = os.getenv(pswrd_name)
key = os.getenv(key_name)
encr_key = os.getenv(encrypted_key_name)
key_file = os.getenv(keyfile_name)
consumer_account = Account(Web3.toChecksumAddress(address), pswrd, key_file, encr_key, key)

print(f"{account=}")
print(f"{consumer_account=}")

# It is also possible to initialize account as follows bypassing the creation of environment variables
# account = Account(Web3.toChecksumAddress(address), pswrd, key_file, encr_key, key)

ddo = ocean.assets.create(metadata, account, providers=["0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0"], use_secret_store=False)
assert ddo is not None, "Registering asset on-chain failed."
print("create asset success")

# Now we have an asset registered, we can verify it exists by resolving the did
_ddo = ocean.assets.resolve(ddo.did)
print(f"{_ddo.as_dictionary()=}")
# ddo and _ddo should be identical
print(_ddo.did)

# CONSUMER
# search for assets
asset_ddo = ocean.assets.search("Ocean protocol")[0]
# Need some ocean tokens to be able to order assets
ocean.accounts.request_tokens(account, 10)
print("request tokens success")

service = ddo.get_service(service_type=ServiceTypes.ASSET_ACCESS)

service_agreement_id = ocean.assets.order(
    ddo.did, service.index, consumer_account, auto_consume=False
)

event_wait_time = 10
event = ocean.keeper.agreement_manager.subscribe_agreement_created(
    service_agreement_id, event_wait_time, None, (), wait=True
)
assert event, "no event for EscrowAccessSecretStoreTemplate.AgreementCreated"
print("agreement created")

#  check if the lock reward goes through
event = ocean.keeper.lock_reward_condition.subscribe_condition_fulfilled(
    service_agreement_id, 120, None, (), wait=True
)
assert event, "no event for LockRewardCondition.Fulfilled"
print("lockreward success")

print(
    f"{service_agreement_id=},{ddo.did=},{service.index=},{consumer_account=},{config.downloads_path=}"
)


brizo = BrizoProvider.get_brizo()
sa = ServiceAgreement.from_ddo(ServiceTypes.ASSET_ACCESS, ddo)
endpoint = sa.service_endpoint
signature = Keeper.get_instance().sign_hash(
    add_ethereum_prefix_and_hash_msg(service_agreement_id), account
)

print(f"{signature=}")
print(f"{endpoint=}")
print(f"{account=}")

#  def _create_consume_url(service_endpoint, agreement_id, account, _file=None,
#                             signature=None, index=None):

url = brizo._create_consume_url(
    endpoint, service_agreement_id, account, signature=signature, index=0
)

print(f"{url=}")

# brizo = BrizoProvider.get_brizo()

# brizo._create_consume_url(service_endpoint, service_agreement_id)

# def _create_consume_url(service_endpoint, agreement_id, account, _file=None,
#                         signature=None, index=None):

# assert ocean.assets.consume(
#     service_agreement_id,
#     ddo.did,
#     service.index,
#     consumer_account,
#     config.downloads_path,
# )
print("asset consumed")

# after a short wait (seconds to minutes) the asset data files should be available in the `downloads.path` defined in config
# wait a bit to let things happen
time.sleep(20)

# Asset files are saved in a folder named after the asset id
dataset_dir = os.path.join(
    ocean.config.downloads_path, f"datafile.{asset_ddo.asset_id}.0"
)
if os.path.exists(dataset_dir):
    print("asset files downloaded: {}".format(os.listdir(dataset_dir)))
