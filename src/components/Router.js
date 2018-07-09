import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Transaction from '../containers/Transaction/Transaction';
import Import from '../containers/ImportTransaction/Import';
import Export from '../containers/ExportTransaction/Export';
import LoginForm from '../containers/LoginForm/LoginForm';
import Dashboard from '../containers/Dashboard/Dashboard';
import React from 'react';


const Router = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={LoginForm}/>
        <Route exact path="/transaction" component={Transaction}/>
        <Route exact path='/transaction/import' component={Import}/>
        <Route exact path='/transaction/export' component={Export}/>
        <Route exact path="/dashboard" component={Dashboard}/>
   </Switch>
    </BrowserRouter>
)

export default Router;