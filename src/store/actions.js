/***
 * profiles
 */
export const CREATE_NEW_PROFILE = 'create_new_profile';
export const DELETE_PROFILES = 'delete_profiles';
export const SELECT_PROFILE = 'select_profile';
export const UNSELET_PROFILE = 'unselect_profile';
export const REMOVE_SELECT_PROFILES = 'remove_select_profiles';


/***
 * profile stocks
 */
export const ADD_SYMBOL = 'add_stock_symbol';
export const DELETE_SYMBOLS = 'delete_stock_symbols';
export const SELECT_SYMBOL = 'select_stock_symbol';
export const UNSELECT_SYMBOL = 'unselect_stock_symbol';
export const REMOVE_SELECT_SYMBOLS = 'remove_select_stock_symbols';

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

export function resetSelectProfiles() {
    return {type: REMOVE_SELECT_PROFILES};
}


/***
 * action stock symbol related functions
 */

export function addSymbol(symbolName) {
    return {type: ADD_SYMBOL, symbolName};
}

export function deleteSymbols(symbols) {
    return {type: DELETE_SYMBOLS, symbols};
}