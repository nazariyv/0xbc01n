import { Ocean } from '@oceanprotocol/squid';
import Web3 from 'web3';

class OceanService {

    ocean = undefined;

    constructor (web3: Web3) {
        this.ocean = await new Ocean.getInstance({
            web3Provider: web3,
            // Test
            nodeUri: 'https://nile.dev-ocean.com',
            aquariusUri: 'https://aquarius.marketplace.dev-ocean.com',
            brizoUri: 'https://brizo.marketplace.dev-ocean.com',
            brizoAddress: '0x4aaab179035dc57b35e2ce066919048686f82972',
            secretStoreUri: 'https://secret-store.nile.dev-ocean.com',
            // local
            //nodeUri: 'http://localhost:8545',
            //aquariusUri: 'http://aquarius:5000',
            //brizoUri: 'http://localhost:8030',
            //brizoAddress: '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0',
            //secretStoreUri: 'http://localhost:12001',
            verbose: true
        });
    }

    registerAsset = async (asset: any) => {
        try {
            const accounts = await this.ocean.accounts.list();
            const ddo = await this.ocean.assets.create(asset, accounts[0]);
            console.log('Asset successfully submitted. Look into your console to see the response DDO object.');
            console.log(ddo);
            return ddo;
        } catch (error) {
            throw new Error(error.message);
        }
    }


}

export default OceanService;