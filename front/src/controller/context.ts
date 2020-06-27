import React from 'react';
import { ApplicationRepresentation } from '../types/type';

export const defaultApplicationRepresentation: ApplicationRepresentation = {
    bounties: []
};

export const ApplicationContext = React.createContext<ApplicationRepresentation>(
    defaultApplicationRepresentation
);