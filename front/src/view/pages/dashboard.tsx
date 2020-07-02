import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ApplicationContext} from '../../controller/context';
import {Bounty} from '../../types/type';

const Dashboard: React.FC = () => {
    const {user, userBounties, bounties, bountySubmissions} = useContext(ApplicationContext);
    const currentUserBounties = bounties.filter(({issuer}: Bounty) => user.addr === issuer);
    let currentUserHaveSubmission: Bounty[] = [];
    let currentUserWorkOnBounties: Bounty[] = [];
    userBounties.forEach(({bounty_id}) => {
         const bounty = bounties.find(item => item.id === bounty_id);
         if (bounty) {
             currentUserWorkOnBounties.push(bounty);
         }
    });
    currentUserBounties.forEach((item) => {
        if(bountySubmissions[item.id]) {
            currentUserHaveSubmission.push(bountySubmissions[item.id]);
        }
    });

    return (
        <div className='dashboard'>
            <div className='dashboard__content'>
                <div className='dashboard_row'>
                    <div className='widget l'>
                        <div className='widget__title'>My Bounties</div>
                        {currentUserBounties.length !== 0 && (
                            <div className='widget__content'>
                                {currentUserBounties.map(bounty => (
                                    <Link key={bounty.id} className='pseudo-link' to={`/bounty/${bounty.id}/description`}>
                                        <div className='item_wrapper'>
                                            <div className='item'>
                                                <div className='item__title'>{bounty.title}</div>
                                                <div>{bounty.short_desc}</div>
                                            </div>
                                            <div className='extra'>{bounty.price}&nbsp;OCEAN</div>
                                        </div>
                                    </Link>
                                ))}
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
                                {currentUserWorkOnBounties.map(bounty => (
                                    <Link key={bounty.id} className='pseudo-link' to={`/bounty/${bounty.id}/description`}>
                                        <div className='item_wrapper'>
                                            <div className='item'>
                                                <div className='item__title'>{bounty.title}</div>
                                                <div>{bounty.short_desc}</div>
                                            </div>
                                            <div className='extra'>{bounty.price}&nbsp;OCEAN</div>
                                        </div>
                                    </Link>
                                ))}
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
                        {currentUserHaveSubmission.length !== 0 && (
                            <div className='widget__content'>
                                content
                            </div>
                        )}
                        {currentUserHaveSubmission.length === 0 && (
                            <div className='widget__content_empty'>
                                <h2>You have received 0 submissions</h2>
                                <p>It looks like you don't have any submissions. Come back after you have received a fulfillment!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
