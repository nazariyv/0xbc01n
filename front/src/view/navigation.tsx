import React, {useContext, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../types/type';
import {ApplicationContext} from '../controller/context';

const FILTERS = [
    { fieldId: 'created', value: 'Created:Recent' },
    { fieldId: 'expiry', value: 'Expiry' },
    { fieldId: 'priceHi', value: 'High Value'},
    { fieldId: 'priceLow', value: 'Low Value'}
];

const Navigation: React.FC = () => {
    const {actionAuthRequired, user, sortKey, onSort} = useContext(ApplicationContext);
    const handleClick = useCallback((key) => onSort(key), [onSort]);
    return (
        <div className='navigation'>
            <div className='quick_filters'>
                {FILTERS.map(item => (
                    <div
                        key={item.fieldId}
                        onClick={() => handleClick(item.fieldId)}
                        className={`quick_filters_item ${sortKey === item.fieldId && 'active'}`}
                    >
                        {item.value}
                    </div>
                ))}
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
