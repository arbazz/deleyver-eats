import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {
    Loading,
    Home,
    RegisterRider,
    Optp,
    Login,
    ResturantSignup,
    Documents
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
                <Route path="/register-rider" component={RegisterRider}/>
                <Route path="/optp" component={Optp}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup-resturant" component={ResturantSignup}/>
                <Route path="/documents" component={Documents}/>
            </Switch>
        </Router>
    )
}