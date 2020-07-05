import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {ROUTES} from './types/type';
import BountyPage from './view/pages/bounty';
import BountyCreatePage from './view/pages/bounty-create';
import Dashboard from './view/pages/dashboard';
import ExplorePage from './view/pages/explore';
import MainPage from './view/pages/main';
import PrivacyPage from './view/pages/privacy';
import UserProfilePage from './view/pages/profile';
import TermsPage from './view/pages/terms';

const Routes = () => (
    <Switch>
        <Route exact path={ROUTES.MAIN}>
            <MainPage />
        </Route>
        <Route exact path={ROUTES.EXPLORE}>
            <ExplorePage />
        </Route>
        <Route path={ROUTES.BOUNTY}>
            <BountyPage />
        </Route>
        {/* Extra static pages */}
        <Route exact path={ROUTES.TERMS}>
            <TermsPage />
        </Route>
        <Route exact path={ROUTES.PRIVACY}>
            <PrivacyPage />
        </Route>
        {/* Auth required */}
        <Route exact path={ROUTES.CREATE}>
            <BountyCreatePage />
        </Route>
        <Route exact path={ROUTES.USER_PROFILE}>
            <UserProfilePage />
        </Route>
        <Route exact path={ROUTES.USER_DASHBOARD}>
            <Dashboard />
        </Route>
    </Switch>
);

export default Routes;
