import React, {useContext, useCallback, useEffect} from 'react';
import {ApplicationContext} from '../controller/context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';

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
    const {onFilter, onResetFilter, filterModel} = useContext(ApplicationContext);
    const handleChange = useCallback((field, value) => onFilter(field, value), [onFilter]);

    useEffect(() => {
        return () => {
            onResetFilter();
        };
    }, []);

    return (
        <>
            <ListSubheader>Refine by</ListSubheader>
            {FIELDS.map(item => (
                <List key={item.title}>
                    <ListSubheader>{item.title}</ListSubheader>                        
                    {item.fields.map(field => (
                        <ListItem key={field.value} button onClick={() => handleChange(item.id, field.value)}>
                            <ListItemText id={field.value} primary={field.title} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    onChange={() => handleChange(item.id, field.value)}
                                    checked={filterModel[item.id].indexOf(field.value) !== -1}
                                    inputProps={{ 'aria-labelledby': field.value }}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            ))}
        </>
    );
};

export default Filter;
