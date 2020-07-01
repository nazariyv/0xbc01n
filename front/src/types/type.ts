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
    USER_PROFILE = '/profile',
    USER_DASHBOARD = '/dashboard'
}

export const COMPLEXITIES: Record<string, string> = {
    BEGINNER: 'Beginner',
    INTERMEDIATE: 'Intermediate',
    ADVANCED: 'Advanced'
};

export const BOUNTY_TYPES: Record<string, string> = {
    CONTEST: 'Contest',
    TRADITIONAL: 'Traditional',
    COOPERATIVE: 'Cooperative'
};

export type Bounty = {
    id: number;
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
    name?: string;
    fullname?: string;
    nickname?: string;
    about_me?: string;
};

export type ApplicationRepresentation = {
    bounties: Bounty[];
    handleLogIn: () => void;
    createBounty: (formData: any) => void;
    updateUser: (addr: string, formData: any) => void;
    startWorkOnBounty: (bountyId: number, addr: string) => void;
    getBountiesUserWorksOn: (addr: string) => void;
    actionAuthRequired: () => void;
    isLoading: boolean;
    modalContent: React.ReactNode | undefined;
    modalAction: () => void;
    users: User[];
    user?: User;
    userBounties: [];
};