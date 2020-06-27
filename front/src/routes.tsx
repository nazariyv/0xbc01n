import React from 'react';
import {Switch, Route} from "react-router-dom";

import {ROUTES} from './types/type';
import MainPage from './view/pages/main';

const Routes = () => (
    <Switch>
        <Route exact path={ROUTES.MAIN}>
            <MainPage/>
        </Route>
        <Route exact path={ROUTES.MARKETPLACE}>
            <div>MARKETPLACE</div>
        </Route>
        <Route exact path={ROUTES.EXPLORE}>
            <div>EXPLORE</div>
        </Route>
        <Route exact path={ROUTES.BOUNTY}>
            <div>BOUNTY</div>
        </Route>
        <Route exact path={ROUTES.BOUNTY_EDIT}>
            <div>BOUNTY_EDIT</div>
        </Route>
        <Route exact path={ROUTES.CREATE}>
            <div>CREATE</div>
        </Route>
    </Switch>
);

export default Routes;
