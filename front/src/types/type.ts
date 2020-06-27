export enum ROUTES {
    MAIN = '/',
    MARKETPLACE = '/marketplace',
    EXPLORE = '/explore',
    BOUNTY = '/bounty/:bountyId',
    BOUNTY_EDIT = '/bounty/:bountyId/edit',
    CREATE = '/create'
}

export enum COMPLEXITY {
    BEGINNER = 'Beginner',
    INTERMEDIATE = 'Intermediate',
    ADVANCED = 'Advanced'
}

export type Bounty = {
    id: string;
    title: string;
    price: string;
    description: string;
    tags: string[];
    complexity: COMPLEXITY;
};

export type ApplicationRepresentation = {
    bounties: Bounty[];
};