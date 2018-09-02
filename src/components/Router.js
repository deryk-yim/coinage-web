import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Transaction from '../containers/Transaction/Transaction';
import LoginForm from '../containers/LoginForm/LoginForm';
import Dashboard from '../containers/Dashboard/Dashboard';
import RegisterForm from '../containers/RegisterForm/RegisterForm';
import Profile from '../containers/Profile/Profile';
import React from 'react';


const Router = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={LoginForm}/>
        <Route exact path="/transaction" component={Transaction}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/register" component={RegisterForm}/>
        <Route exact path="/profile" component={Profile}/>
   </Switch>
    </BrowserRouter>
)

export default Router;