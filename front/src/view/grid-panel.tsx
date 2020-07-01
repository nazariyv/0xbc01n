import React, {useContext} from 'react';
import {ApplicationContext} from '../controller/context';

const GridPanel: React.FC = () => {
    const {bounties} = useContext(ApplicationContext);
    return (
        <div className='grid-panel'>
            <div className='grid-panel__section grid-panel__section_left'>
                <span className='number'>{bounties.length}</span>bounties
            </div>
        </div>
    );
};

export default GridPanel;
