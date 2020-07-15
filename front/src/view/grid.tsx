import React, {useContext} from 'react';
import {ApplicationContext} from '../controller/context';
import {Bounty} from '../types/type';
//import GridPanel from './grid-panel';
import GridItem from './grid-item';
import Navigation from './navigation';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const GridView: React.FC = () => {
    const classes = useStyles();
    const {bounties, isLoading, bountyApplicant} = useContext(ApplicationContext);

    if (isLoading) {
        return (
            <Backdrop className={classes.backdrop} open>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (bounties.length === 0) {
        return (
            <Grid container item xs={12}>
                <Typography variant="h5">Sorry, you don't have any bounties</Typography>
                <Typography variant="body1">Please try again or change filter criteria.</Typography>
            </Grid>
        );
    }

    return (
        <>
            <Navigation/>
            {/*<GridPanel/>*/}
            {bounties.map((bounty: Bounty) => (
                <GridItem key={bounty.id} {...bounty} bountyApplicants={bountyApplicant[bounty.id]}/>
            ))}
        </>
    );
};

export default GridView;
