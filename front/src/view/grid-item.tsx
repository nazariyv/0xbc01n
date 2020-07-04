import React from 'react';
import { Link } from 'react-router-dom';
import {toAmount, toData} from '../utils/utils';
import {Bounty, BOUNTY_TYPES, COMPLEXITIES, UserInfo} from '../types/type';

type GridItemProps = Bounty & {
    bountyApplicants: UserInfo[];
};

const GridItem: React.FC<GridItemProps> = (props) => {
    const { id, title, short_desc, price, expiry, type, complexity, bountyApplicants } = props;
    const daysDiff = (dt1, dt2) => {
        var diffTime = (dt1.getTime() - dt2.getTime());
        var daysDiff = diffTime / (1000 * 3600 * 24);
        return parseInt(daysDiff, 10);
    };
    const diffDays = daysDiff(toData(expiry), new Date());
    // const diffDays = new Date(expiry * 1000).getDate() - now.getDate();
    const typeKey = type.split('.').pop().toUpperCase();
    const complexityKey = complexity.split('.').pop().toUpperCase();

    return (
        <Link to={`/bounty/${id}/description`} className='pseudo-link no-link'>
            <div className='grid_item'>
                <div className='grid_item__content'>
                    <div className='grid_item__section grid_item__section_left'>
                        <div className='grid_item__header'>
                            <div className='grid_item__header_avatar'>
                                <img src='https://gitcoin.co/dynamic/avatar/oceanprotocol' className='img' />
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
                                <div className='value'>Ready to work</div>
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
                                <div className='label'>Work Started</div>
                                <div className='value'>
                                    {bountyApplicants === undefined ? <>-</> : <>{bountyApplicants.length}</>}
                                </div>
                            </div>
                            <div className='grid_item__info_item'>
                                <div className='label'>Type</div>
                                <div className='value'>{BOUNTY_TYPES[typeKey]}</div>
                            </div>
                        </div>
                    </div>
                    <div className='grid_item__section grid_item__section_right'>
                        <div className='price l'>{toAmount(price)}&nbsp;OCEAN</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GridItem;
