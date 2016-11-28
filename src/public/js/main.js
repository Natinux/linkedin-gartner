import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import { LocalStorageHelper, LogHelper } from './helpers';
import HomeContainer from './containers/home';
import User from './components/User';
import Profiles from './components/Profiles'
import Search from './components/Search';
import Skills from './components/Skills';
import Profile from './components/Profile'


const store = configureStore(LocalStorageHelper.get('state') || {});
const history = syncHistoryWithStore(browserHistory, store);

const routes = (
    <Route path="/" component={HomeContainer}>
        <IndexRoute component={User} />
        <Route path="/" component={User} />
        <Route path="/profiles/:pageNumber" component={Profiles} />
        <Route path="/skills/:pageNumber" component={Skills} />
        <Route path="/search" component={Search} />
        <Route path="/profile/:profileId" component={Profile} />
    </Route>
);

function run(){
    let state = store.getState();
    LocalStorageHelper.set('state', state);

    render((
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>
    ), document.querySelector('#app'));
}

export function startApplication() {
    store.subscribe(run);
    run();
}