import React from 'react';
import Main from '../main';

const BountyPage: React.FC = ({ children }) => (
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
                        <div className='tab active'>Description</div>
                        <div className='tab'>Contributors</div>
                        <div className='tab'>Submissions</div>
                        <div className='tab'>All Activity</div>
                        <div className='spacer'/>
                        <button className='action-button'>
                            Start Work
                        </button>
                    </div>
                    <div className='tabs_content'>
                        <p>We’ve revamped our prediction market contracts and created the new conditional tokens smart contracts. Conditional tokens are a fundamentally new type of asset class based on the ERC1155 token standard, which allows you to use multiple types of tokens within a single application.</p>
                        <p>In prediction markets applications, conditional tokens allow you to:</p>
                        <p>Make simple markets on the likelihood of a given event.
                        Make complex markets about how the likelihood of an event is affected by any other event.
                        Trade any asset under the condition that a specific event happens.
                        Currently, prediction markets are our main use case for conditional tokens.
                        However, conditional tokens are so versatile that they can be used for many different applications—from games with in-game assets like rewards and incentives to grant systems with conditional payouts based on milestones being reached.</p>
                        <p>To encourage the development of conditional tokens use cases, we are reaching out to the community for inspiration. We will give out Nanogrants from $50 to $500 for exceptional use cases. We will reward the best Twitter threads with $50 Nanogrants, payouts for projects using alternative mediums (e.g. blogpost or community call) will be determined based on their complexity and utility.</p>
                        <p>We will consider projects that showcase interesting and new use cases for conditional tokens. We are especially interested in use cases that spark discussion within the ecosystem.
                            For the nanogrants to be awarded to Twitter threads, we’d like to see how you can engage the community in developing conditional tokens use cases. E.g., have you prompted anyone to respond to your thread? Do the use cases involve key ecosystem topics</p>
                    </div>
                </div>
                <div className='bounty__content bounty__content_right'>
                    <div className='bounty__price'>
                        <div className='bounty__price_origin'>100 ETH</div>
                        <div className='bounty__price_from'>Converted from:&nbsp;USD 22489,00, EUR 20047,16, GBP 18226,69</div>
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

export default BountyPage;
