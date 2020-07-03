import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../../controller/context';
import {Bounty, Submission} from '../../types/type';
import {getBountyById, getUserByAddr} from '../../utils/utils';

const Dashboard: React.FC = () => {
    const { user, users, userBounties, bounties, bountySubmissions, pickBountyWinner, getBountySubmissions } = useContext(ApplicationContext);
    const [state, setState] = useState<{
        usrBounties: Bounty[];
        usrBountySubmission: Submission[];
        usrWorkOnBounties: Bounty[];
        isLoading: boolean;
    }>({
        usrBounties: [],
        usrBountySubmission: [],
        usrWorkOnBounties: [],
        isLoading: false
    });

    useEffect(() => {
        if (user) {
            setState({...state, isLoading: true });
            const usrBounties = bounties.filter(({ issuer }: Bounty) => String(user.addr).toLowerCase() === String(issuer).toLowerCase());
            const usrWorkOnBounties = userBounties.map(({ bounty_id }) => getBountyById(bounties, bounty_id)).filter(Boolean);
            usrBounties.forEach(bounty => {
                getBountySubmissions(bounty.id);
            });
            setState({
                ...state,
                usrBounties,
                usrWorkOnBounties,
                isLoading: false
            });
        }
    }, []);

    const onApprove = useCallback((bountyId, submissionId, addr) => {
        pickBountyWinner(bountyId, submissionId, addr);
    }, []);

    const hasUsrSubmissions = Object.keys(bountySubmissions).length !== 0;

    return (
        <div className='dashboard'>
            <div className='dashboard__content'>
                <div className='dashboard_row'>
                    <div className='widget l'>
                        <div className='widget__title'>My Bounties</div>
                        {state.usrBounties.length !== 0 && (
                            <div className='widget__content'>
                                {state.usrBounties.map(bounty => (
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
                        {state.usrBounties.length === 0 && (
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
                                {state.usrWorkOnBounties.map(bounty => (
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
                        {state.usrWorkOnBounties.length === 0 && (
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
                        {hasUsrSubmissions && (
                            <div className='widget__content'>
                                {Object.keys(bountySubmissions).map((key) => {
                                    return bountySubmissions[key].map(item => (
                                        <div className='submission' key={item.id}>
                                            <div className='submission_content'>
                                                <div className='submission__meta'>
                                                    Author: <b>{item.addr}</b>
                                                </div>
                                                <div className='submission__title'>{item.name}</div>
                                                <div className='submission_short_url'>
                                                    <input type='text' className='form__input' value={item.sample_url} />
                                                </div>
                                            </div>
                                            <div className='submission_extra'>
                                                <button className='action-button' onClick={() => onApprove(item.bounty_id, item.id, item.addr)}>
                                                    Approve
                                                </button>
                                            </div>
                                        </div>
                                    ));
                                })}
                            </div>
                        )}
                        {!hasUsrSubmissions && (
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
