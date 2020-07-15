import React, {useContext, useCallback} from 'react';
import {ApplicationContext} from '../controller/context';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

const FILTERS = [
    { fieldId: 'created', value: 'Created:Recent' },
    { fieldId: 'expiry', value: 'Expiry' },
    { fieldId: 'priceHi', value: 'High Value'},
    { fieldId: 'priceLow', value: 'Low Value'}
];

const Navigation: React.FC = () => {
    const classes = useStyles();
    const {sortKey, onSort} = useContext(ApplicationContext);
    const active = FILTERS.findIndex(item => item.fieldId === sortKey);
    const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: number) => {
        const current = FILTERS[newValue];
        onSort(current.fieldId);
    }, []);

    return (
        <Paper className={classes.root}>
            <Tabs
                value={active}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                {FILTERS.map(item => (<Tab key={item.fieldId} label={item.value} />))}
            </Tabs>
        </Paper>
    );
};

export default Navigation;
