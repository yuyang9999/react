

import Fetch_util from './fetch_utilis';


let address = Fetch_util.address;

class UserReqs {
    static registerUser(username, email, password, cb) {
        Fetch_util.fetchGetRequest(address + '/users/register', {userName:username, email: email, password:password}, cb, false);
    }
}

export default UserReqs;