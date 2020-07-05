import React, {useContext, useCallback, useEffect} from 'react';
import {ApplicationContext} from '../controller/context';

const FIELDS = [
    {
        id: 'type',
        title: 'Bounty Type',
        fields: [
            {  id: 'type', value: 'BountyTypes.traditional', title: 'Traditional' },
            {  id: 'type', value: 'BountyTypes.contest', title: 'Contest' },
            {  id: 'type', value: 'BountyTypes.cooperative', title: 'Cooperative' }
        ]
    },
    {
        id: 'complexity',
        title: 'Complexity',
        fields: [
            { id: 'complexity', value: 'Complexities.beginner', title: 'Beginner' },
            { id: 'complexity', value: 'Complexities.advanced', title: 'Advanced' },
            { id: 'complexity', value: 'Complexities.intermediate', title: 'Intermediate' }
        ]
    }
];

const Filter: React.FC = () => {
    const {onFilter, onResetFilter} = useContext(ApplicationContext);
    const handleChange = useCallback((field, value) => onFilter(field, value), [onFilter]);

    useEffect(() => {
        return () => {
            onResetFilter();
        };
    }, []);

    return (
        <div className='filter'>
            <div className='filter__content'>
                <div className='title'>Refine by</div>
                {FIELDS.map(item => (
                    <div className='filter__row' key={item.id}>
                        <div className='filter__row_label'>{item.title}</div>
                        <div className='filter__row_field'>
                            <div className='filter__row_field'>
                                {item.fields.map(field => (
                                    <label key={field.value} htmlFor={field.value}>
                                        {field.title}
                                        <input
                                            onChange={() => handleChange(item.id, field.value)}
                                            type='checkbox'
                                            value='false'
                                            name={field.value}
                                            id={field.value}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filter;
