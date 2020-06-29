import {Bounty, User} from '../types/type';

class ApiService {
    constructor (private endpoint: string) {}

    getUsers = async () => {
        const response = await fetch('/api/user', {method: 'GET'});
        try {
            return await response.json();
        } catch (e) {
            throw new Error('Server error');
        }
    }

    putCreateUser = async (publicAddress: User['addr']) => {
        const response = await fetch('/api/user',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ addr: publicAddress })
            }
        );
        try {
            return await response;
        } catch (e) {
            throw new Error('Server error');
        }
    }

    putUpdateUser = async (publicAddress: User['addr'], userInfo: Partial<User>) => {
        const response = await fetch(`/api/user/${publicAddress}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            }
        );
        try {
            return await response;
        } catch (e) {
            throw new Error('Server error');
        }
    }

    getBounties = async () => {
        const response = await fetch('/api/bounty', {method: 'GET'});
        try {
            return await response.json();
        } catch (e) {
            throw new Error('Server error');
        }
    }

    putCreateBounty = async (newBounty: Bounty) => {
        const response = await fetch('/api/bounty',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBounty)
            }
        );
        try {
            return await response;
        } catch (e) {
            throw new Error('Server error');
        }
    }

    putUpdateBounty = async (bountyId: Bounty['id'], bountyFields: Partial<Bounty>) => {
        const response = await fetch(`/api/bounty/${bountyId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bountyFields)
            }
        );
        try {
            return await response.json();
        } catch (e) {
            throw new Error('Server error');
        }
    }

    postUserStartWorkOnBounty = async (bountyId: Bounty['id'], publicAddress: User['addr']) => {
        const response = await fetch(`/api/bounty/${bountyId}/start_work`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ addr: publicAddress })
            }
        );
        try {
            return await response;
        } catch (e) {
            throw new Error('Server error');
        }
    }

    postUserSubmitsSampleDataset = async (bountyId: Bounty['id'], publicAddress: User['addr'], ipfsUrl: string) => {
        const response = await fetch(`/api/bounty/${bountyId}/submit_sample`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ addr: publicAddress, ipfs_url: ipfsUrl })
            }
        );
        try {
            return await response;
        } catch (e) {
            throw new Error('Server error');
        }
    }
}

export default ApiService;