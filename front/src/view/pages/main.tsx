import React from 'react';

import FilterView from '../filter';
import GridView from '../grid';

const MainPage: React.FC = ({ children }) => (
    <>
        <FilterView/>
        <GridView/>
    </>
);

export default MainPage;
