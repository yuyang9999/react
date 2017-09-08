import {createStore} from 'redux';
import storeReducer from './reducer';

const store = createStore(storeReducer)

export default store;