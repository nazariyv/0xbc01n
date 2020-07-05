import React from 'react';
import {ApplicationRepresentation, Bounty, SortModel, Submission, SubmissionData, User} from '../types/type';
import {toData} from '../utils/utils';

export const defaultApplicationRepresentation: ApplicationRepresentation = {
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
    modalAction: () => {},
    onFilter: (field: string, value: string) => {},
    bounties: [],
    bountyApplicant: {},
    originalData: [],
    isLoading: false,
    modalContent: undefined,
    users: [],
    user: undefined,
    userBounties: [],
    sortKey: 'created',
    bountySubmissions: {},
    filterModel: {
        type: [],
        complexity: []
    }
};

export const ApplicationContext = React.createContext<ApplicationRepresentation>(
    defaultApplicationRepresentation
);