import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ApplicationContext} from '../../controller/context';

const Dashboard: React.FC = () => {
    const {user, userBounties, bounties} = useContext(ApplicationContext);
    const currentUserBounties = bounties.filter(({issuer}) => user.addr === issuer);
    return (
        <div className='dashboard'>
            <div className='dashboard__content'>
                <div className='dashboard_row'>
                    <div className='widget l'>
                        <div className='widget__title'>My Bounties</div>
                        {currentUserBounties.length !== 0 && (
                            <div className='widget__content'>
                                content
                            </div>
                        )}
                        {currentUserBounties.length === 0 && (
                            <div className='widget__content_empty'>
                                <h2>You have no active bounties</h2>
                                <p>It looks like you don't have any active bounties at the moment.
                                    Enter a title for a new bounty here to get started creating one!</p>
                            </div>
                        )}
                    </div>
                    <div className='widget l'>
                        <div className='widget__title'>My Activity</div>
                        {userBounties.length !== 0 && (
                            <div className='widget__content'>
                                content
                            </div>
                        )}
                        {userBounties.length === 0 && (
                            <div className='widget__content_empty'>
                                <h2>You have no activity yet</h2>
                                <p>Once you start using the platform, your activity will show up here.</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className='dashboard_row'>
                    <div className='widget xl'>
                        <div className='widget__title'>Submissions</div>
                        <div className='widget__content'>
                            content
                        </div>
                        <div className='widget__content_empty'>
                            <h2>You have received 0 submissions</h2>
                            <p>It looks like you don't have any submissions.
                                Come back after you have received a fulfillment!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
