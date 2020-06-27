import React from 'react';

import GridPanel from './grid-panel';
import GridItem from './grid-item';

const Grid: React.FC = () => (
    <div className="grid">
        <GridPanel/>
        <div className="grid__content">
            <GridItem/>
            <GridItem/>
            <GridItem/>
            <GridItem/>
            <GridItem/>
        </div>
    </div>
);

export default Grid;
