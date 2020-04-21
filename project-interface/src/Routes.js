import React, {Component} from "react";
import {Router, Switch, Route} from "react-router-dom";

import App from './App';
import Login from './login';
import Signup from './signup';
import loginSP from './loginSP';
import SignupSP from './signupSP';
import history from './history';
import serviceCategories from './serviceCategories';
import categoriesList from './categoriesList';
import searchPage from './searchPage';
import setting from './setting';
import mainChatBox from './mainChatBox';
import chatBox from './chatBox';
import bookmarkPage from './bookmarkPage';
import serviceSpecific from './serviceSpecific';

export default class Routes extends Component{
    render(){
        return(
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/loginServiceProvider" component={loginSP}/>
                    <Route path="/signupServiceProvider" component={SignupSP}/>
                    <Route path="/serviceCategories" component={serviceCategories}/>
                    <Route path="/categoriesList" component={categoriesList}/>
                    <Route path="/serviceSpecific" component={serviceSpecific}/>
                    <Route path="/searchPage" component={searchPage}/>
                    <Route path="/setting" component={setting}/>
                    <Route path="/mainChatBox" component={mainChatBox}/>
                    <Route path="/chatBox" component={chatBox}/>
                    <Route path="/bookmarkPage" component={bookmarkPage}/>
                </Switch>
            </Router>
        )
    }
}