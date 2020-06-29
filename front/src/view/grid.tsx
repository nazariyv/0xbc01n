import React, {useContext} from 'react';
import {ApplicationContext} from '../controller/context';
import {Bounty} from '../types/type';
import GridPanel from './grid-panel';
import GridItem from './grid-item';

const Grid: React.FC = () => {
    const {bounties} = useContext(ApplicationContext);

    if (bounties.length === 0) {
        return (
            <>
                Empty
            </>
        );
    }

    return (
        <div className='grid'>
            <GridPanel/>
            <div className='grid__content'>
                {bounties.map((bounty: Bounty) => (
                    <GridItem key={bounty.id} {...bounty}/>
                ))}
            </div>
        </div>
    );
};

export default Grid;
