export enum ROUTES {
    MAIN = '/',
    MARKETPLACE = '/marketplace',
    EXPLORE = '/explore',
    BOUNTY = '/bounty/:bountyId',
    BOUNTY_EDIT = '/bounty/:bountyId/edit',
    CREATE = '/create',
    TERMS = '/terms',
    PRIVACY = '/privacy',
    USER_PROFILE = '/profile'
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

export type User = {
    publicAddress: string;
    signature: string;
    // Additional info
    firstName?: string;
    lastName?: string;
    email?: string;
};

export type ApplicationRepresentation = {
    bounties: Bounty[];
    handleLogIn: () => void;
    isLoading: boolean;
    signInProgress: boolean;
    user?: User;
};