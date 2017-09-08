
import {combineReducers} from 'redux';
import {CREATE_NEW_PROFILE, DELETE_PROFILES, REMOVE_SELECT_PROFILES, SELECT_PROFILE, UNSELET_PROFILE} from './actions';

function profilesReducer(state = [], action) {
    switch (action.type) {
        case CREATE_NEW_PROFILE:
            return [
                ...state,
                {
                    name: action.profileName
                }
            ];
        case DELETE_PROFILES:
            let deleteArr = action.profileArr;

            var ret = [];

            for (let i = 0; i < state.length; i++) {
                let profile = state[i];
                if (deleteArr.indexOf(profile.name) == -1) {
                    ret.push(profile);
                }
            }

            return ret;
        default:
            return state;
    }
}

function selectedProfilesReducer(state = [], action) {
    switch (action.type) {
        case SELECT_PROFILE:
            if (state.indexOf(action.profileName) == -1) {
                return [
                    ...state, action.profileName
                ];
            }
        case UNSELET_PROFILE:
            if (state.indexOf(action.profileName) != -1) {
                let idx = state.indexOf(action.profileName);
                return [
                    ...state.slice(0, idx),
                    ...state.slice(idx+1)
                ];
            }
        case REMOVE_SELECT_PROFILES:
            //reset all selected profiles
            return [];

        default:
            return state;
    }
}

const storeReducer = combineReducers({
    profilesReducer,
    selectedProfilesReducer
});


export default storeReducer;