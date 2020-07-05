import React from 'react';

export enum ROUTES {
    MAIN = '/',
    EXPLORE = '/explore',
    BOUNTY = '/bounty/:bountyId',
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
    created: number;
};

export type User = {
    addr: string;
    name?: string;
    fullname?: string;
    nickname?: string;
    about_me?: string;
};

export type SubmissionData = {
    name: string;
    addr: string;
    full_dataset_url: string;
    sample_url: string;
    price: number;
};

export type Submission = {
    name: string;
    addr: string;
    created: number;
    did: string;
    bounty_id: number;
    id: number;
    price: number;
};

export type FilterModel = Record<string, string[]>;

export type SortModel = Record<string, (a: Bounty, b: Bounty) => number>;

export type UserInfo = {
    bounty_id: string;
};

export type ApplicationRepresentation = {
    bounties: Bounty[];
    bountyApplicant: Record<Bounty['id'], UserInfo[]>;
    originalData: Bounty[];
    handleLogIn: () => void;
    createBounty: (formData: any) => void;
    updateUser: (addr: string, formData: any) => void;
    startWorkOnBounty: (bountyId: number, addr: string) => void;
    getBountiesUserWorksOn: (addr: string) => void;
    submitSubmissionForBounty: (bountyId: number, data: SubmissionData) => void;
    pickBountyWinner: (bountyId: Bounty['id'], submissionId: Submission['id'], publicAddress: User['addr']) => void;
    getBountySubmissions: (bountyId: number) => void;
    onSort: (fieldId: string) => void;
    handleLogOut: () => void;
    onResetFilter: () => void;
    actionAuthRequired: () => void;
    isLoading: boolean;
    modalContent: React.ReactNode | undefined;
    modalAction: () => void;
    users: User[];
    user?: User;
    userBounties: Bounty[];
    bountySubmissions: Record<string, any>;
    sortKey?: string;
    // Filter
    onFilter: (field: string, value: string) => void;
    filterModel: FilterModel;
};