import React from 'react';
import { ApplicationRepresentation } from '../types/type';

export const defaultApplicationRepresentation: ApplicationRepresentation = {};

export const ApplicationContext = React.createContext<ApplicationRepresentation>(
    defaultApplicationRepresentation,
);