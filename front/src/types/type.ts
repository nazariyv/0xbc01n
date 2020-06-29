import React from 'react';

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

export type Bounty = {
    id: string;
    title: string;
    short_desc: string;
    price: number;
    issuer: string;
    type: string;
    expiry: number;
    desc: string;
    complexity: string;
};

export type User = {
    addr: string;
    signature: string;
    // Additional info
    firstName?: string;
    lastName?: string;
    email?: string;
};

export type ApplicationRepresentation = {
    bounties: Bounty[];
    handleLogIn: () => void;
    createBounty: (formData: any) => void;
    actionAuthRequired: () => void;
    isLoading: boolean;
    modalContent: React.ReactNode | undefined;
    modalAction: () => void;
    users: User[];
    user?: User;
};