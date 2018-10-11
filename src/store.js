import { createStore, applyMiddleware, compose } from 'redux';
import {initialState} from './initialState';


import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// tell redux to save our router information in state


const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(thunk)));
//export const history = syncHistoryWithStore(browserHistory, store);

export default store;