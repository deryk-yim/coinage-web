import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';

import Transaction from '../containers/Transaction/Transaction';
import LoginForm from '../containers/LoginForm/LoginForm';
import RegisterForm from '../containers/RegisterForm/RegisterForm';
import Dashboard from '../containers/Dashboard/Dashboard';
import Profile from '../containers/Profile/Profile';
import Insights from '../containers/Insights/Insights';


import ImportTransactionPage from '../containers/ImportTransaction/ImportTransactionPage';
import ExportTransactionPage from '../containers/ExportTransaction/ExportTransactionPage';
import ExportTransactionHistory from '../containers/ExportTransaction/ExportTransactionHistory';

import store from '../store';

require('../styles/main.css');

const Router = () => (
    <Provider store={store}>
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/transaction" component={Transaction} />
        <Route exact path="/transaction/import" component={ImportTransactionPage} />
        <Route exact path="/transaction/export" component={ExportTransactionPage} />
        <Route exact path="/transaction/export/history" component={ExportTransactionHistory} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/insights" component={Insights} />
   </Switch>
    </BrowserRouter>
    </Provider>
);
export default Router;
