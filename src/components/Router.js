import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Transaction from './Transaction';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import React from 'react';


const Router = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={LoginForm}/>
        <Route exact path="/transaction" component={Transaction}/>
        <Route exact path="/dashboard" component={Dashboard}/>
   </Switch>
    </BrowserRouter>
)

export default Router;