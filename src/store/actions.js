


export const CREATE_NEW_PROFILE = 'create_new_profile';
export const DELETE_ONE_PROFILE = 'delete_one_profile';

/**
 action 创建函数
 */
export function createNewProfile(profileName) {
    return {type: CREATE_NEW_PROFILE, profileName};
}

export function deleteOneProfile(index) {
    return {type: DELETE_ONE_PROFILE, index};
}

