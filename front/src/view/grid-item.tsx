import React from 'react';
import {Link} from 'react-router-dom';

import {Bounty, BOUNTY_TYPES, COMPLEXITIES} from '../types/type';

const GridItem: React.FC<Bounty> = (props) => {
    const {id, title, short_desc, price, expiry, type, complexity} = props;
    const now = new Date();
    const diffDays = new Date(expiry).getDate() - now.getDate();
    const typeKey =  type.split('.').pop().toUpperCase();
    const complexityKey = complexity.split('.').pop().toUpperCase();
    return (
        <Link to={`/bounty/${id}/description`} className='pseudo-link'>
            <div className='grid_item'>
                <div className='grid_item__content'>
                    <div className='grid_item__section grid_item__section_left'>
                        <div className='grid_item__header'>
                            <div className='grid_item__header_avatar'>
                                <img src='https://gitcoin.co/dynamic/avatar/oceanprotocol' className='img'/>
                            </div>
                            <div className='grid_item__header_info'>
                                <div className='grid_item__title'>{title}</div>
                                <div className='grid_item__description'>{short_desc}</div>
                            </div>
                        </div>
                        <div className='grid_item__tags tags'>
                            <div className='tag'>privacy</div>
                            <div className='tag'>oceanprotocol</div>
                            <div className='tag'>databounty</div>
                        </div>
                        <div className='grid_item__info'>
                            <div className='grid_item__info_item'>
                                <div className='label'>Status</div>
                                <div className='value'>-</div>
                            </div>
                            <div className='grid_item__info_item'>
                                <div className='label'>Time Left</div>
                                <div className='value'>{diffDays} Days</div>
                            </div>
                            <div className='grid_item__info_item'>
                                <div className='label'>Experience Level</div>
                                <div className='value'>{COMPLEXITIES[complexityKey]}</div>
                            </div>
                            <div className='grid_item__info_item'>
                                <div className='label'>Applicants</div>
                                <div className='value'>-</div>
                            </div>
                            <div className='grid_item__info_item'>
                                <div className='label'>Type</div>
                                <div className='value'>{BOUNTY_TYPES[typeKey]}</div>
                            </div>
                        </div>
                    </div>
                    <div className='grid_item__section grid_item__section_right'>
                        <div className='price l'>{price}&nbsp;OCEAN</div>
                        {/*<div className='price m'>22489,00 USD</div>
                        <div className='price s'>20047,16 EUR</div>
                        <div className='price xs'>18226,69 GBP</div>*/}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GridItem;
