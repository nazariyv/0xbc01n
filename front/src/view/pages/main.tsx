import React from 'react';

import FilterView from '../filter';
import GridView from '../grid';
import Main from '../main';
import Navigation from '../navigation';

const MainPage: React.FC = ({ children }) => (
    <>
        <Navigation/>
        <Main>
            <FilterView/>
            <GridView/>
        </Main>
    </>
);

export default MainPage;
