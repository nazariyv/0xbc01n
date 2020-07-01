import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import ErrorBoundary from './components/error-boundary';
import Modal from './components/modal';
import Container from './view/container';
// import Footer from './view/footer';
import Header from './view/header';
import Routes from './routes';

import ApplicationController from './controller/provider';

import './style/style.less';

const App = () => {
	return (
		<ErrorBoundary>
			<ApplicationController>
				<Container>
					<BrowserRouter>
						<Header/>
						<Routes/>
						{/*<Footer/>*/}
						<Modal/>
					</BrowserRouter>
				</Container>
			</ApplicationController>
		</ErrorBoundary>
	);
};

export default App;
