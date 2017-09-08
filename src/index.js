import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './views/about';
import Profiles from './views/profiles/Profiles';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path={"/about"} component={About} />
            <Route path={"/profiles"} component={Profiles} />
        </div>
    </Router>
), document.getElementById('root'));

registerServiceWorker();
