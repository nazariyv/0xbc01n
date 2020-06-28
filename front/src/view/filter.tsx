import React from 'react';

const Filter: React.FC = () => (
    <div className='filter'>
        <div className='filter__content'>
            <div className='title'>Refine by</div>
            <div className='filter__row'>
                <div className='filter__row_label'>Stage</div>
                <div className='filter__row_field'>
                    <div className='filter__row_field'>
                        <label htmlFor='active'>
                            Active
                            <input type='checkbox' value='false' name='active' id='active'/>
                        </label>
                        <label htmlFor='completed'>
                            Completed
                            <input type='checkbox' value='false' name='completed' id='completed'/>
                        </label>
                        <label htmlFor='expired'>
                            Expired
                            <input type='checkbox' value='false' name='expired' id='expired'/>
                        </label>
                    </div>
                </div>
            </div>
            <div className='filter__row'>
                <div className='filter__row_label'>Difficulty</div>
                <div className='filter__row_field'>
                    <label htmlFor='beginner'>
                        Beginner
                        <input type='checkbox' value='false' name='beginner' id='beginner'/>
                    </label>
                    <label htmlFor='intermediate'>
                        Intermediate
                        <input type='checkbox' value='false' name='intermediate' id='intermediate'/>
                    </label>
                    <label htmlFor='expert'>
                        Expert
                        <input type='checkbox' value='false' name='expert' id='expert'/>
                    </label>
                </div>
            </div>
        </div>
    </div>
);

export default Filter;
