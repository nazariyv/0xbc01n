import React from 'react';
import { ApplicationRepresentation } from '../types/type';

export const defaultApplicationRepresentation: ApplicationRepresentation = {
    bounties: [],
    handleLogIn: () => {},
    isLoading: false,
    signInProgress: false,
    user: undefined
};

export const ApplicationContext = React.createContext<ApplicationRepresentation>(
    defaultApplicationRepresentation
);