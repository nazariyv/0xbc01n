import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ErrorBoundary from './components/error-boundary';
import Modal from './components/modal';
import Container from '@material-ui/core/Container';
import Header from './view/header';
import Routes from './routes';
import ApplicationController from './controller/provider';

const useStyles = makeStyles((theme) => ({
	appBarSpacer: theme.mixins.toolbar,
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
}));

const App = () => {
	const classes = useStyles();
	return (
		<ErrorBoundary>
			<div className={classes.root}>
				<CssBaseline />
				<ApplicationController>
					<BrowserRouter>
						<Header/>
						<main className={classes.content}>
        					<div className={classes.appBarSpacer} />
							<Container maxWidth="lg" className={classes.container}>
								<Routes/>
							</Container>
						</main>
					</BrowserRouter>
				</ApplicationController>
			</div>
		</ErrorBoundary>
	);
};

export default App;
