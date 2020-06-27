import React from 'react';

const GridItem: React.FC = () => (
    <div className="grid_item">
        <div className="grid_item__content">
            <div className="grid_item__section grid_item__section_left">
                <div className="grid_item__header">
                    <div className="grid_item__header_avatar">
                        <img src="https://gitcoin.co/dynamic/avatar/keep-network" className="img"/>
                    </div>
                    <div className="grid_item__header_info">
                        <div className="grid_item__title">Data Bounty Platform Using Ocean Protocol</div>
                        <div className="grid_item__description">
                            Data bounty platforms are apps where data consumers can request data they need and set the price they are wiling to pay for it. Goal of this bounty is for some awesome developer like yourself to build this platform using Ocean Protocol , suggest and implement appropriate dispute resolution mechanism and operate and grow this platform.
                        </div>
                    </div>
                </div>
                <div className="grid_item__tags tags">
                    <div className="tag">privacy</div>
                    <div className="tag">oceanprotocol</div>
                    <div className="tag">databounty</div>
                    <div className="tag">marketplaces</div>
                    <div className="tag">disputeresolution</div>
                </div>
                <div className="grid_item__info">
                    <div className="grid_item__info_item">
                        <div className="label">Status</div>
                        <div className="value">Ready to work</div>
                    </div>
                    <div className="grid_item__info_item">
                        <div className="label">Time Left</div>
                        <div className="value">11 Days</div>
                    </div>
                    <div className="grid_item__info_item">
                        <div className="label">Experience Level</div>
                        <div className="value">Intermediate</div>

                    </div>
                    <div className="grid_item__info_item">
                        <div className="label">3</div>
                        <div className="value">Applicants</div>
                    </div>
                </div>
            </div>
            <div className="grid_item__section grid_item__section_right">
                <div className="price l">100 ETH</div>
                <div className="price m">22489,00 USD</div>
                <div className="price s">20047,16 EUR</div>
                <div className="price xs">18226,69 GBP</div>
            </div>
        </div>
    </div>
);

export default GridItem;
