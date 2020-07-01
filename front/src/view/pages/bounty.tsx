import React, {useContext, useCallback, useEffect} from 'react';
import {Switch, Route, NavLink, useRouteMatch, useParams} from 'react-router-dom';
import {ApplicationContext} from '../../controller/context';
import {BOUNTY_TYPES, COMPLEXITIES} from '../../types/type';

import Main from '../main';

const BountyPage: React.FC = () => {
    const {bounties, user, startWorkOnBounty, getBountiesUserWorksOn, userBounties} = useContext(ApplicationContext);
    const { path, url } = useRouteMatch();
    const {bountyId} = useParams();
    const bountyInfo = bounties.find(({id}) => id === Number(bountyId));

    useEffect(() => {
        if (user) {
            getBountiesUserWorksOn(user.addr);
        }
    }, [user, userBounties]);

    if (bountyInfo) {
        const {title, short_desc, price, expiry, type, complexity, desc, issuer} = bountyInfo;
        const now = new Date();
        const diffDays = new Date(expiry).getDate() - now.getDate();
        const typeKey =  type.split('.').pop().toUpperCase();
        const complexityKey = complexity.split('.').pop().toUpperCase();
        const handleStartWork = useCallback((bountyId, addr) => {
            startWorkOnBounty(bountyId, addr);
        }, []);
        return (
            <Main>
                <div className='bounty'>
                    <div className='bounty__header'>
                        <div className='bounty__header_title'>{title}</div>
                        <div className='bounty__header_short_description'>{short_desc}</div>
                        <div className='bounty__header_tags tags'>
                            <div className='tag'>privacy</div>
                            <div className='tag'>oceanprotocol</div>
                            <div className='tag'>databounty</div>
                        </div>
                    </div>
                    <div className='bounty__content'>
                        <div className='bounty__content bounty__content_left'>
                            <div className='tabs'>
                                <NavLink className='tab' activeClassName='active' to={`${url}/description`}>Description</NavLink>
                                <NavLink className='tab' activeClassName='active' to={`${url}/contributors`}>Contributors</NavLink>
                                <NavLink className='tab' activeClassName='active' to={`${url}/submissions`}>Submissions</NavLink>
                                <NavLink className='tab' activeClassName='active' to={`${url}/activity`}>All Activity</NavLink>
                                <div className='spacer'/>
                                {user && user.addr !== bountyInfo.issuer && (
                                    <button className='action-button' onClick={() => handleStartWork(bountyId, user.addr)}>
                                        Start Work
                                    </button>
                                )}
                            </div>
                            <div className='tabs_content'>
                                <Switch>
                                    <Route exact path={`${path}/description`}>
                                        {desc}
                                    </Route>
                                    <Route path={`${path}/contributors`}>
                                        <div className='tabs_content__empty'>
                                            Bounty doesn't have any Contributors
                                        </div>
                                    </Route>
                                    <Route path={`${path}/submissions`}>
                                        <div className='tabs_content__empty'>
                                            Bounty doesn't have any Submissions
                                        </div>
                                    </Route>
                                    <Route path={`${path}/activity`}>
                                        <div className='tabs_content__empty'>
                                            Bounty doesn't have any Activities
                                        </div>
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                        <div className='bounty__content bounty__content_right'>
                            <div className='bounty__price'>
                                <div className='bounty__price_origin'>{price}&nbsp;OCEAN</div>
                                {/*<div className='bounty__price_from'>Converted from:&nbsp;USD 22489,00, EUR 20047,16, GBP
                                    18226,69
                                </div>*/}
                            </div>
                            <div className='bounty__info'>
                                <div className='bounty__info_item'>
                                    <div className='value'>Ready to work</div>
                                    <div className='label'>Status</div>
                                </div>
                                <div className='bounty__info_item'>
                                    <div className='value'>{diffDays} Days</div>
                                    <div className='label'>Time Left</div>
                                </div>
                                <div className='bounty__info_item'>
                                    <div className='value'>{COMPLEXITIES[complexityKey]}</div>
                                    <div className='label'>Experience Level</div>
                                </div>
                                <div className='bounty__info_item'>
                                    <div className='value'>{BOUNTY_TYPES[typeKey]}</div>
                                    <div className='label'>Type</div>
                                </div>
                                <div className='bounty__info_item'>
                                    <div className='value'>-</div>
                                    <div className='label'>Applicants</div>
                                </div>
                                <div className='bounty__info_item'>
                                    <div className='value'>-</div>
                                    <div className='label'>Work Submitted</div>
                                </div>
                            </div>
                            <div className='founder__info'>
                                <div className='founder__info_title'>Funder information</div>
                                <div className='founder__info_block'>
                                    <div className='founder__info_avatar'>
                                        <img src='https://gitcoin.co/dynamic/avatar/keep-network' className='img'/>
                                    </div>
                                    <div className='founder__info_detail'>
                                        <div>{issuer}</div>
                                        <div>-//-</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        );
    }

    return null;
};

export default BountyPage;
