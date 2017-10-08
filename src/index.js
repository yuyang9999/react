import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './views/about';
import Profiles from './views/profiles/Profiles';
import Profile from './views/profile';
import DetailProfile from './views/profiles/profileDetail';
import Login from './views/login';
import Register from './views/register';

import registerServiceWorker from './registerServiceWorker';
// import {redirectNonAuth} from './requests/redirectNonAuth';

import {Provider} from 'react-redux';
import store from './store/store';
import Fetch_util from './requests/fetch_utilis';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// const store = createStore(storeReducer);

const redirectNonAuth = function (nextState, replace) {
    if (Fetch_util.checkRequireAuth()) {
        replace({
            pathname: "/login",
        });
    }
};

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
    <Provider store={store}>
    <Router>
        <div>
            <Route exact path="/" component={Profile} />
            <Route path={"/about"} component={About} />
            <Route path={"/profiles"} component={Profile} />
            <Route path={"/login"} component={Login} />
            <Route path={"/register"} component={Register} />
            <Route path={"/profile/:profile_id"} component={DetailProfile} />
        </div>
    </Router>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
