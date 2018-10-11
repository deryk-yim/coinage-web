import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Transaction from '../containers/Transaction/Transaction';
import LoginForm from '../containers/LoginForm/LoginForm';
import RegisterForm from '../containers/RegisterForm/RegisterForm';
import Dashboard from '../containers/Dashboard/Dashboard';
<<<<<<< HEAD
<<<<<<< HEAD
import Profile from '../containers/Profile/Profile'
=======
import RegisterForm from '../containers/RegisterForm/RegisterForm';
import Profile from '../containers/Profile/Profile';
>>>>>>> refs/remotes/origin/dashboard
import React from 'react';
=======
import ImportTransactionPage from '../containers/ImportTransaction/ImportTransactionPage';
import ExportTransactionPage from '../containers/ExportTransaction/ExportTransactionPage';
import ExportTransactionHistory from '../containers/ExportTransaction/ExportTransactionHistory';
>>>>>>> fb583f70faab6f30d3bd8c517f665e3ceace6ae2

import React from 'react';
import { render } from 'react-dom';
import {IndexRoute, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import store, {history } from '../store';

const Router = () => (
    <Provider store={store}>
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={LoginForm}/>
        <Route exact path="/transaction" component={Transaction}/>
        <Route exact path='/transaction/import' component={ImportTransactionPage}/>
        <Route exact path='/transaction/export' component={ExportTransactionPage}/>
        <Route exact path='/transaction/export/history' component={ExportTransactionHistory}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/register" component={RegisterForm}/>
        <Route exact path="/profile" component={Profile}/>
   </Switch>
    </BrowserRouter>
    </Provider>
)

export default Router;