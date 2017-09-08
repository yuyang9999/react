


export const CREATE_NEW_PROFILE = 'create_new_profile';
export const DELETE_PROFILES = 'delete_profiles';
export const SELECT_PROFILE = 'select_profile';
export const UNSELET_PROFILE = 'unselect_profile';


/**
 action 创建函数
 */
export function createNewProfile(profileName) {
    return {type: CREATE_NEW_PROFILE, profileName};
}

export function deleteProfiles(profileArr) {
    return {type: DELETE_PROFILES, profileArr};
}

export function selectProfile(profileName) {
    return {type: SELECT_PROFILE, profileName};
}

export function unselectProfile(profileName) {
    return {type: UNSELET_PROFILE, profileName};
}
