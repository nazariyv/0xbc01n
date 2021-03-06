import {Bounty, User, SubmissionData, Submission} from '../types/type';

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

    getBountiesUserWorksOn = async (publicAddress: User['addr']) => {
        const response = await fetch(`/api/user/${publicAddress}/works_bounties`,{method: 'GET'});
        try {
            return await response.json();
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

    postUserSubmitsToBounty = async (bountyId: Bounty['id'], data: SubmissionData) => {
        // TODO: REMOVE THESE IN PROD. THESE ARE FROM SPREE SEED PHRASE. RUNNING OUT OF TIME THUS THEY ARE HERE
        data.addr = '0xe2DD09d719Da89e5a3D0F2549c7E24566e947260';
        console.log('postUserSubmitsToBounty >> data >>> ', data);
        const response = await fetch(`/api/bounty/${bountyId}/fulfill`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        try {
            return await response;
        } catch (e) {
            throw new Error('Server error');
        }
    }

    getSubmissionsForBounty = async (bountyId: Bounty['id']) => {
        const response = await fetch(`/api/bounty/${bountyId}/submissions`, {method: 'GET'});
        try {
            return await response.json();
        } catch (e) {
            throw new Error('Server error');
        }
    }

    postBountyCreatorPickWinner = async (bountyId: Bounty['id'], submissionId: Submission['id'], publicAddress: User['addr']) => {
        const response = await fetch(`/api/bounty/${bountyId}/submission/${submissionId}/is_winner`,
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
}

export default ApiService;