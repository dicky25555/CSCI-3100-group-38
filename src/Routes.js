import React, {Component} from "react";
import {Router, Switch, Route} from "react-router-dom";

import App from './App';
import Login from './login';
import Signup from './signup';
import history from './history'

export default class Routes extends Component{
    render(){
        return(
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                </Switch>
            </Router>
        )
    }
}