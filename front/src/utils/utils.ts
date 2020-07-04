import {Bounty, User, FilterModel} from '../types/type';

export const getUserByAddr = (users: User[], addr: User['addr']) => users.find(user => user.addr === addr);

export const getBountyById = (bounties: Bounty[], bountyId: Bounty['id']) => bounties.find(bounty => bounty.id === bountyId);

export const filterArray = (bounties: Bounty[], filterModel: FilterModel): Bounty[] => bounties.reduce((a: Bounty, b: Bounty) => {
    return (filterModel['type'].includes(b.type) || filterModel['complexity'].includes(b.complexity)) ? [...a, b] : a;
}, []);

export const toData = (timestamp: number): Date => new Date(timestamp * 1000);

export const getUserName = (user?: User): string => {
    let name = '';
    if (user) {
        if (user.addr && !user.nickname && !user.fullname && !user.name) {
            name = user.addr;
        } else if (user.nickname && !user.fullname && !user.name) {
            name = user.nickname;
        } else if (user.name) {
            name = user.name;
        }
    }
    return name;
};

export const toAmount = (amount: Bounty['price']): string => String(amount).replace(/(.)(?=(\d{3})+$)/g, '$1,');

export const amountToNumber = (amountStr: string): number => Number(String(amountStr).replace(/,/g, ''));

export const getDateFormatted = (date: Date) => `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;