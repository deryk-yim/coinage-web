import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

import { initialState } from './initialState';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// tell redux to save our router information in state

const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(thunk)));

export default store;
