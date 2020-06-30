import React from 'react';

const Filter: React.FC = () => (
    <div className='filter'>
        <div className='filter__content'>
            <div className='title'>Refine by</div>
            <div className='filter__row'>
                <div className='filter__row_label'>Bounty Type</div>
                <div className='filter__row_field'>
                    <div className='filter__row_field'>
                        <label htmlFor='contest'>
                            Contest
                            <input type='checkbox' value='false' name='contest' id='contest'/>
                        </label>
                        <label htmlFor='traditional'>
                            Traditional
                            <input type='checkbox' value='false' name='traditional' id='traditional'/>
                        </label>
                        <label htmlFor='cooperative'>
                            Cooperative
                            <input type='checkbox' value='false' name='cooperative' id='cooperative'/>
                        </label>
                    </div>
                </div>
            </div>
            <div className='filter__row'>
                <div className='filter__row_label'>Complexity</div>
                <div className='filter__row_field'>
                    <label htmlFor='beginner'>
                        Beginner
                        <input type='checkbox' value='false' name='beginner' id='beginner'/>
                    </label>
                    <label htmlFor='intermediate'>
                        Intermediate
                        <input type='checkbox' value='false' name='intermediate' id='intermediate'/>
                    </label>
                    <label htmlFor='advanced'>
                        Advanced
                        <input type='checkbox' value='false' name='advanced' id='advanced'/>
                    </label>
                </div>
            </div>
        </div>
    </div>
);

export default Filter;
