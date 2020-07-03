import {Bounty, Submission, User} from '../types/type';

export const getUserByAddr = (users: User[], addr: User['addr']) => users.find(user => user.addr === addr);

export const getBountyById = (bounties: Bounty[], bountyId: Bounty['id']) => {
    bounties.find(bounty => bounty.id === bountyId);
};