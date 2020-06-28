import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {ROUTES} from './types/type';
import BountyPage from './view/pages/bounty';
import BountyCreatePage from './view/pages/bounty-create';
import BountyEditPage from './view/pages/bounty-edit';
import ExplorePage from './view/pages/explore';
import MainPage from './view/pages/main';
import MarketplacePage from './view/pages/marketplace';

const Routes = () => (
    <Switch>
        <Route exact path={ROUTES.MAIN}>
            <MainPage />
        </Route>
        <Route exact path={ROUTES.MARKETPLACE}>
            <MarketplacePage />
        </Route>
        <Route exact path={ROUTES.EXPLORE}>
            <ExplorePage />
        </Route>
        <Route exact path={ROUTES.BOUNTY}>
            <BountyPage />
        </Route>
        <Route exact path={ROUTES.BOUNTY_EDIT}>
            <BountyEditPage />
        </Route>
        <Route exact path={ROUTES.CREATE}>
            <BountyCreatePage />
        </Route>
    </Switch>
);

export default Routes;
