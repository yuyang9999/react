

import Fetch_util from '../requests/fetch_utilis';
import {History} from 'react-router-dom';

import {Component} from 'react';

class BaseView extends Component {
    componentWillMount() {
        if (Fetch_util.checkRequireAuth()) {
            this.props.history.replace("/login");
        }
    }
}

export default BaseView;