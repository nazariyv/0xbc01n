import React from 'react';

import GridPanel from './grid-panel';
import GridItem from './grid-item';

const Grid: React.FC = () => (
    <div className='grid'>
        <GridPanel/>
        <div className='grid__content'>
            <GridItem id='123'/>
            <GridItem id='ed3'/>
            <GridItem id='1sd3'/>
            <GridItem id='1432d3'/>
            <GridItem id='12sdf3d'/>
        </div>
    </div>
);

export default Grid;
