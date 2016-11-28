import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {ConfigHelper} from '../helpers';

let middlewares = ConfigHelper.get('env.name') == 'prod' ? [] : [createLogger()];
middlewares.push(routerMiddleware(browserHistory));
middlewares.push(thunk);

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(reducers, initialState);
}