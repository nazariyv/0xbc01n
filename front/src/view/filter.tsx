import React, {useContext, useCallback} from 'react';
import {ApplicationContext} from '../controller/context';

const FIELDS = [
    {
        id: 'type',
        title: 'Bounty Type',
        fields: [
            {  id: 'type', name: 'BountyTypes.traditional', title: 'Traditional' },
            {  id: 'type', name: 'BountyTypes.contest', title: 'Contest' },
            {  id: 'type', name: 'BountyTypes.cooperative', title: 'Cooperative' }
        ]
    },
    {
        id: 'complexity',
        title: 'Complexity',
        fields: [
            { id: 'complexity', name: 'Complexities.beginner', title: 'Beginner' },
            { id: 'complexity', name: 'Complexities.advanced', title: 'Advanced' },
            { id: 'complexity', name: 'Complexities.intermediate', title: 'Intermediate' },
        ]
    },
];

const Filter: React.FC = () => {
    const {onFilter, filterFields} = useContext(ApplicationContext);
    const handleClick = useCallback((field, type) => onFilter(field, type), [onFilter]);

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
                                    <label key={field.name} htmlFor={field.name}>
                                        {field.title}
                                        <input onChange={() => handleClick(field, item.id)} type='checkbox' value='false' name={field.name} id={field.name}/>
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
