
import Fetch_util from './fetch_utilis';

export const redirectNonAuth = (nextState, replace) => {
    if (Fetch_util.checkRequireAuth()) {
        replace({
            pathname: "/login",
        });
    }
};