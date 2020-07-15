import React, {useContext} from 'react';
import {ApplicationContext} from '../controller/context';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const GridPanel: React.FC = () => {
    const {bounties} = useContext(ApplicationContext);
    return (
        <Grid container spacing={1}>
            <Typography gutterBottom variant="subtitle1">{bounties.length} bounties</Typography>
        </Grid>
    );
};

export default GridPanel;
