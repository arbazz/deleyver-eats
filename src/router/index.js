import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {
    Loading,
    Home,
    RegisterRider
} from '../pages/index'

export default function router() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Loading />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/register-rider">
                    <RegisterRider />
                </Route>
            </Switch>
        </Router>
    )
}