import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Transaction from '../containers/Transaction/Transaction';
import LoginForm from '../containers/LoginForm/LoginForm';
import RegisterForm from '../containers/RegisterForm/RegisterForm';
import Dashboard from '../containers/Dashboard/Dashboard';
import Profile from '../containers/Profile/Profile';
import Insights from '../containers/Insights/Insights';
import React from 'react';


const Router = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={LoginForm}/>
        <Route exact path="/transaction" component={Transaction}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/register" component={RegisterForm}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/insights" component={Insights}/>
   </Switch>
    </BrowserRouter>
)

export default Router;