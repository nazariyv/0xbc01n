import React from 'react';

const GridPanel: React.FC = () => (
    <div className='grid-panel'>
        <div className='grid-panel__section grid-panel__section_left'>
            <span className='number'>11</span>bounties
        </div>
        <div className='grid-panel__section grid-panel__section_right'>
            Sort by
            <select name='sort_option' id='sort_option'>
                <option value='created_new'>Created: Recent</option>
                <option value='created_old'>Created: Oldest</option>
                <option value='val_hi'>Value: Highest</option>
                <option value='val_low'>Value: Lowest</option>
            </select>
        </div>
    </div>
);

export default GridPanel;
