import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Transaction from '../containers/Transaction/Transaction';
import LoginForm from '../containers/LoginForm/LoginForm';
import Dashboard from '../containers/Dashboard/Dashboard';
import ImportTransactionPage from '../containers/ImportTransaction/ImportTransactionPage';
import ExportTransactionPage from '../containers/ExportTransaction/ExportTransactionPage';
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
        <Route exact path="/dashboard" component={Dashboard}/>
   </Switch>
    </BrowserRouter>
    </Provider>
)

export default Router;