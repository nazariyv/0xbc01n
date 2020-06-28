import React from 'react';
import {Switch, Route, NavLink, useRouteMatch, Redirect} from 'react-router-dom';

import Main from '../main';

const BountyPage: React.FC = ({ children }) => {
    const { path, url } = useRouteMatch();
    return (
        <Main>
            <div className='bounty'>
                <div className='bounty__header'>
                    <div className='bounty__header_title'>Data Bounty Platform Using Ocean Protocol</div>
                    <div className='bounty__header_short_description'>
                        Data bounty platforms are apps where data consumers can request data they need
                        and set the price they are wiling to pay for it...
                    </div>
                    <div className='bounty__header_tags tags'>
                        <div className='tag'>privacy</div>
                        <div className='tag'>oceanprotocol</div>
                        <div className='tag'>databounty</div>
                        <div className='tag'>marketplaces</div>
                        <div className='tag'>disputeresolution</div>
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
                            <button className='action-button'>
                                Start Work
                            </button>
                        </div>
                        <div className='tabs_content'>
                            <Switch>
                                <Route exact path={`${path}/description`}>
                                    Description content
                                </Route>
                                <Route path={`${path}/contributors`}>
                                    Contributors content
                                </Route>
                                <Route path={`${path}/submissions`}>
                                    Submissions content
                                </Route>
                                <Route path={`${path}/activity`}>
                                    All Activity content
                                </Route>
                            </Switch>
                        </div>
                    </div>
                    <div className='bounty__content bounty__content_right'>
                        <div className='bounty__price'>
                            <div className='bounty__price_origin'>100 ETH</div>
                            <div className='bounty__price_from'>Converted from:&nbsp;USD 22489,00, EUR 20047,16, GBP
                                18226,69
                            </div>
                        </div>
                        <div className='bounty__info'>
                            <div className='bounty__info_item'>
                                <div className='value'>Ready to work</div>
                                <div className='label'>Status</div>
                            </div>
                            <div className='bounty__info_item'>
                                <div className='value'>11 Days</div>
                                <div className='label'>Time Left</div>
                            </div>
                            <div className='bounty__info_item'>
                                <div className='value'>Intermediate</div>
                                <div className='label'>Experience Level</div>
                            </div>
                            <div className='bounty__info_item'>
                                <div className='value'>3</div>
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
                                    <div>0x4654b3035ab7f71d711de25f456468f5f64b61834fq3</div>
                                    <div>foobarbaz@fobar.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default BountyPage;
