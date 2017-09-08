

import {CREATE_NEW_PROFILE, DELETE_ONE_PROFILE} from './actions';

function storeReducer(state = [], action) {
    switch (action.type) {
        case CREATE_NEW_PROFILE:
            return [
                ...state,
                {
                    name: action.profileName
                }
            ];
        case DELETE_ONE_PROFILE:
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ];
        default:
            return state;
    }
}

export default storeReducer;