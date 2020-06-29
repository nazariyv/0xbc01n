import {Bounty, User} from '../types/type';

class ApiService {
    constructor (private endpoint: string) {}

    getUsers = async () => {

    }

    putCreateUser = async (publicAddress: User['publicAddress']) => {

    }

    putUpdateUser = async (publicAddress: User['publicAddress'], userInfo: Partial<User>) => {

    }

    getBounties = async () => {

    }

    putCreateBounty = async (newBounty: Bounty) => {

    }

    putUpdateBounty = async (bountyId: Bounty['id'], bountyFields: Partial<Bounty>) => {

    }

    postUserStartWorkOnBounty = async (bountyId: Bounty['id'], publicAddress: User['publicAddress']) => {

    }

    postUserSubmitsSampleDataset = async (bountyId: Bounty['id'], publicAddress: User['publicAddress'], ipfsUrl: string) => {

    }
}

export default ApiService;