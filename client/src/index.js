import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/application.scss';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode'
import { setAuthToken } from './util/sessionUtil'
import { logout } from './actions/sessionActions'

import * as API from './util/game_api_util'

import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (localStorage.jwt) {
        setAuthToken(localStorage.jwt)
        const decodedUser = jwt_decode(localStorage.jwt)
        const preloadedState = { session: { isAuthenticated: true, user: decodedUser } }
        store = configureStore(preloadedState)
        const currentTime = Date.now() / 1000
        if (decodedUser.exp < currentTime) {
            store.dispatch(logout())
            window.location.href = "/"
        }
    } else {
        store = configureStore({})
    }
    
    window.API = API;

    const root = document.getElementById('root');
    ReactDOM.render(<Root store={ store }/>, root);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

