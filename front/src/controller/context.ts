import React from 'react';
import {ApplicationRepresentation, Bounty, SortModel, Submission, SubmissionData, User} from '../types/type';
import {toData} from '../utils/utils';

export const defaultApplicationRepresentation: ApplicationRepresentation = {
    bounties: [],
    bountyApplicant: {},
    originalData: [],
    handleLogIn: () => {},
    createBounty: (formData: any) => {},
    updateUser: (addr: string, formData: any) => {},
    startWorkOnBounty: (bountyId: number, addr: string) => {},
    getBountiesUserWorksOn: (addr: string) => {},
    submitSubmissionForBounty: (bountyId: number, data: SubmissionData) => {},
    pickBountyWinner: (bountyId: Bounty['id'], submissionId: Submission['id'], publicAddress: User['addr']) => {},
    getBountySubmissions: (bountyId: number) => {},
    onSort: (fieldId: string) => {},
    handleLogOut: () => {},
    actionAuthRequired: () => {},
    onResetFilter: () => {},
    isLoading: false,
    modalAction: () => {},
    modalContent: undefined,
    users: [],
    user: undefined,
    userBounties: [],
    sortKey: 'created',
    bountySubmissions: {},

    onFilter: (field: string, value: string) => {},
    filterModel: {
        type: [],
        complexity: []
    }
};

// TODO: Fix me!
export const sortModel: SortModel = {
    // @ts-ignore
    created: (a, b) => toData(b.created) - toData(a.created),
    // @ts-ignore
    expiry: (a, b) => toData(a.expiry) - toData(b.expiry),
    priceHi: (a, b) => b.price - a.price,
    priceLow: (a, b) => a.price - b.price
};

export const ApplicationContext = React.createContext<ApplicationRepresentation>(
    defaultApplicationRepresentation
);