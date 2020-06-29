import React from 'react';
import { ApplicationRepresentation } from '../types/type';

export const defaultApplicationRepresentation: ApplicationRepresentation = {
    bounties: [],
    handleLogIn: () => {},
    createBounty: (formData: any) => {},
    actionAuthRequired: () => {},
    isLoading: false,
    modalAction: () => {},
    modalContent: undefined,
    users: [],
    user: undefined
};

export const ApplicationContext = React.createContext<ApplicationRepresentation>(
    defaultApplicationRepresentation
);