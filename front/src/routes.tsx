import React from 'react';
import {Switch, Route} from "react-router-dom";

const Routes = () => (
    <Switch>
        <Route path="/">
            <div>1</div>
        </Route>
        <Route path="/foo">
            <div>1</div>
        </Route>
        <Route path="/bar">
            <div>1</div>
        </Route>
        <Route path="/baz">
            <div>1</div>
        </Route>
    </Switch>
);

export default Routes;
