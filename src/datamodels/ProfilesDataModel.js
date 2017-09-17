
let server_addr = 'http://localhost:8080/';
let api_version = 'api/';


let api_profiles = server_addr + api_version + 'profiles';
let api_deleteProfiles = server_addr + api_version + 'profile_delete';
let api_addOneProfile = server_addr + api_version + 'profile_add';


class ProfilesDataModel {
    static getProfiles(cmpHandler) {
        fetch(api_profiles).then((resp)=> {
            if (resp.ok) {
                return resp.json();
            }
        }).then((jsonResp)=> {
            cmpHandler(jsonResp);
        }).catch((e)=> {
            console.log(e);
        });
    }

    static deleteOneProfile(pnames, cmpCB) {
        const body = JSON.stringify(pnames);
        fetch(api_deleteProfiles, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then((resp)=> {
            if (resp.ok) {
                return resp.json();
            }
        }).then((jsonResp)=> {
            cmpCB(jsonResp);
        }).catch((e)=> {
            console.log(e);
        });
    }

    static addOneProfile(pname, cb) {
        const url = encodeURIComponent(api_addOneProfile + '?pname='+pname);
        fetch(url).then((resp)=> {
            if (resp.ok) {
                return resp.json();
            }
        }).then((jsonResp)=> {
            cb(jsonResp);
        }).catch((e)=> {
            console.log(e);
        });
    }

}


export default ProfilesDataModel;