

import Fetch_util from './fetch_utilis';


class UserReqs {
    static registerUser(username, email, password, cb) {
        Fetch_util.fetchGetRequest('http://localhost:8080/users/register', {userName:username, email: email, password:password}, cb, false);
    }
}

export default UserReqs;