import React from 'react';
import { ApplicationRepresentation } from '../types/type';

export const defaultApplicationRepresentation: ApplicationRepresentation = {
    bounties: [],
    handleLogIn: () => {},
    createBounty: (formData: any) => {},
    updateUser: (addr: string, formData: any) => {},
    startWorkOnBounty: (bountyId: number, addr: string) => {},
    getBountiesUserWorksOn: (addr: string) => {},
    actionAuthRequired: () => {},
    isLoading: false,
    modalAction: () => {},
    modalContent: undefined,
    users: [],
    user: undefined,
    userBounties: []
};

export const ApplicationContext = React.createContext<ApplicationRepresentation>(
    defaultApplicationRepresentation
);