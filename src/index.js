import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './views/about';
import Profiles from './views/profiles/Profiles';
import registerServiceWorker from './registerServiceWorker';

import storeReducer from './store/reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';


import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


const store = createStore(storeReducer);


// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path={"/about"} component={About} />
            <Provider store={store}>
                <Route path={"/profiles"} component={Profiles} />
            </Provider>
        </div>
    </Router>
), document.getElementById('root'));

registerServiceWorker();
