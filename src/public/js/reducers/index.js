import React from 'react';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { Alerts } from './alert';
import { Profiles } from './profiles';
import { Skills } from './skills';

export default combineReducers({
    Alerts,
    Profiles,
    Skills,
    routing: routerReducer
});