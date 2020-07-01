import { Ocean, Logger } from '@oceanprotocol/squid';
import Web3 from 'web3';

class OceanService {

    ocean = undefined;

    constructor () {
        this.init();
    }

    init = async () => {
        const web3 = new Web3(window.web3.currentProvider);
        this.ocean = await Ocean.getInstance({
            web3Provider: web3,
            nodeUri: 'http://localhost:8545',
            aquariusUri: 'http://localhost:5000',
            brizoUri: 'http://localhost:8030',
            brizoAddress: '0x00bd138abd70e2f00903268f3db08f2d25677c9e',
            parityUri: 'http://localhost:9545',
            secretStoreUri: 'http://localhost:12001'
        });
    }

    registerAsset = async (asset: any) => {
        try {
            const accounts = await this.ocean.accounts.list();
            console.log('accounts ', asset, accounts[0]);
            const ddo = await this.ocean.assets.create(asset, accounts[0]);
            console.log('Asset successfully submitted. Look into your console to see the response DDO object.');
            console.log(ddo);
            return ddo;
        } catch (error) {
            throw new Error(error);
        }
    }

}

export default OceanService;