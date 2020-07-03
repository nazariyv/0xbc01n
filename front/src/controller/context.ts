import React from 'react';
import {ApplicationRepresentation, Bounty, Submission, SubmissionData, User} from '../types/type';

export const defaultApplicationRepresentation: ApplicationRepresentation = {
    bounties: [],
    handleLogIn: () => {},
    createBounty: (formData: any) => {},
    updateUser: (addr: string, formData: any) => {},
    startWorkOnBounty: (bountyId: number, addr: string) => {},
    getBountiesUserWorksOn: (addr: string) => {},
    submitSubmissionForBounty: (bountyId: number, data: SubmissionData) => {},
    pickBountyWinner: (bountyId: Bounty['id'], submissionId: Submission['id'], publicAddress: User['addr']) => {},
    getBountySubmissions: (bountyId: number) => {},
    onSort: (fieldId: string) => {},
    onFilter: (filter: any, type: string) => {},
    handleLogOut: () => {},
    actionAuthRequired: () => {},
    isLoading: false,
    modalAction: () => {},
    modalContent: undefined,
    users: [],
    user: undefined,
    userBounties: [],
    sortKey: 'created',
    bountySubmissions: {},
    filterFields: [],
};

export const ApplicationContext = React.createContext<ApplicationRepresentation>(
    defaultApplicationRepresentation
);