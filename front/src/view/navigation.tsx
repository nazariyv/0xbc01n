import React from 'react';

const Navigation: React.FC = () => (
    <div className='navigation'>
        <div className='quick_filters'>
            <div className='quick_filters_item active'>Most Recent</div>
            <div className='quick_filters_item'>Most Viewed</div>
            <div className='quick_filters_item'>High Value</div>
            <div className='quick_filters_item'>Expiry</div>
        </div>
        <div className='extra'>
            <button className='action-button'>
                Create a Bounty
            </button>
        </div>
    </div>
);

export default Navigation;
