import React from 'react';
import { Link } from 'react-router-dom';
import {toAmount, toData} from '../utils/utils';
import {Bounty, BOUNTY_TYPES, COMPLEXITIES, UserInfo} from '../types/type';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    container: {
        cursor: 'pointer'
    },
    paper: {
        width: '100%',
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    img: {
        width: 84
    },
    grid: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}));

type GridItemProps = Bounty & {
    bountyApplicants: UserInfo[];
};

const GridItem: React.FC<GridItemProps> = (props) => {
    const history = useHistory();    
    const classes = useStyles();
    const { id, title, short_desc, price, expiry, type, complexity, bountyApplicants } = props;
    const daysDiff = (dt1, dt2) => {
        var diffTime = (dt1.getTime() - dt2.getTime());
        var daysDiff = diffTime / (1000 * 3600 * 24);
        return parseInt(daysDiff, 10);
    };
    const diffDays = daysDiff(toData(expiry), new Date());
    // const diffDays = new Date(expiry * 1000).getDate() - now.getDate();
    const typeKey = type.split('.').pop().toUpperCase();
    const complexityKey = complexity.split('.').pop().toUpperCase();
    const handleBountyOpen = (id: string) => history.push(`/bounty/${id}/description`);

    return (
        <Grid container item xs={12} onClick={() => handleBountyOpen(id)} className={classes.container}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm container spacing={2}>
                        <Grid item>
                            <img src='https://gitcoin.co/dynamic/avatar/oceanprotocol' className={classes.img} />
                        </Grid>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography variant="h6">{title}</Typography>
                                <Typography variant="body2">{short_desc}</Typography>
                                <Grid item container spacing={2} className={classes.grid}>
                                    <Grid item xs={2}>
                                        <Typography variant="subtitle2">Status</Typography>
                                        <Typography variant="subtitle1">Ready to work</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="subtitle2">Time Left</Typography>
                                        <Typography variant="subtitle1">{diffDays} Days</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="subtitle2">Experience Level</Typography>
                                        <Typography variant="subtitle1">{COMPLEXITIES[complexityKey]}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="subtitle2">Work Started</Typography>
                                        <Typography variant="subtitle1">
                                            {bountyApplicants === undefined ? <>-</> : <>{bountyApplicants.length}</>}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="subtitle2">Type</Typography>
                                        <Typography variant="subtitle1">{BOUNTY_TYPES[typeKey]}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Chip className={classes.chip} label="privacy" />
                                    <Chip className={classes.chip} label="oceanprotocol" />
                                    <Chip className={classes.chip} label="databounty" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">{toAmount(price)}&nbsp;OCEAN</Typography>
                        </Grid>
                    </Grid>    
                </Grid>
            </Paper>
        </Grid>
    );
};

export default GridItem;
