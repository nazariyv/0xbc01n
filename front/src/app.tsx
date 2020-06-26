import React from 'react';
import {BrowserRouter} from "react-router-dom";

import ErrorBoundary from './components/error-boundary';
import Container from './view/container';
import Footer from './view/footer';
import Header from './view/header';
import Routes from './routes';
import Main from './view/main';

import ApplicationController from './controller/provider';

import './style/style.less';

const App = () => {
	return (
		<ErrorBoundary>
			<ApplicationController>
				<Container>
					<BrowserRouter>
						<Header/>
						<Main>
							<Routes/>
						</Main>
						<Footer/>
					</BrowserRouter>
				</Container>
			</ApplicationController>
		</ErrorBoundary>
	);
}

export default App;
