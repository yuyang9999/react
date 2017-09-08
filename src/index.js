import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './views/about';
import Profiles from './views/profiles/Profiles';
import DetailProfile from './views/profiles/profileDetail';

import registerServiceWorker from './registerServiceWorker';


import {Provider} from 'react-redux';
import store from './store/store';


import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// const store = createStore(storeReducer);


// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
    <Provider store={store}>
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path={"/about"} component={About} />
            <Route path={"/profiles"} component={Profiles} />
            <Route path={"/profile/:profile_id"} component={DetailProfile} />
        </div>
    </Router>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
