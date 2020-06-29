import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../types/type';
import {ApplicationContext} from '../controller/context';

const Navigation: React.FC = () => {
    const {actionAuthRequired, user} = useContext(ApplicationContext);
    return (
        <div className='navigation'>
            <div className='quick_filters'>
                <div className='quick_filters_item active'>Most Recent</div>
                <div className='quick_filters_item'>Most Viewed</div>
                <div className='quick_filters_item'>High Value</div>
                <div className='quick_filters_item'>Expiry</div>
            </div>
            <div className='extra'>
                {user && (
                    <Link className='header__link' to={ROUTES.CREATE}>
                        <button className='action-button'>
                            Create a Bounty
                        </button>
                    </Link>
                )}
                {!user && (
                    <button
                        className='action-button'
                        onClick={actionAuthRequired}
                    >
                        Create a Bounty
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navigation;
