import React, {useContext} from 'react';
import {ApplicationContext} from '../controller/context';
import {Bounty} from '../types/type';
import GridPanel from './grid-panel';
import GridItem from './grid-item';

const Grid: React.FC = () => {
    const {bounties, isLoading, bountyApplicant} = useContext(ApplicationContext);
    if (isLoading) {
        return (
            <div className='wrapper'>
                <div className='loader'/>
            </div>
        );
    }

    if (bounties.length === 0) {
        return (
            <div className='grid__empty'>
                <div>
                    <h2>Sorry, you don't have any bounties</h2>
                    <p>Please try again or change filter criteria.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='grid'>
            <GridPanel/>
            <div className='grid__content'>
                {bounties.map((bounty: Bounty) => (
                    <GridItem key={bounty.id} {...bounty} bountyApplicants={bountyApplicant[bounty.id]}/>
                ))}
            </div>
        </div>
    );
};

export default Grid;
