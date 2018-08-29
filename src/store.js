import { createStore, applyMiddleware, compose } from 'redux';
import {initialState} from './initialState';

//import {syncHistoryWithStore} from 'react-router-redux';
//import { browserHistory} from 'react-router';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(thunk)));
//export const history = syncHistoryWithStore(browserHistory, store);

export default store;