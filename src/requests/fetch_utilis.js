

class Cookie_utility {
    static setCookie(c_name, value) {
        document.cookie = c_name + "=" + encodeURI(value);
    }

    static getCookie(c_name) {
        if (document.cookie.length>0)
        {
            let c_start=document.cookie.indexOf(c_name + "=");
            if (c_start!=-1)
            {
                c_start=c_start + c_name.length+1;
                let c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1) c_end=document.cookie.length;
                return decodeURI(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    }


}


class Fetch_util {
    static oauth_object;
    static oauth_time;

    static checkRequireAuth() {
        if (!Fetch_util.oauth_object) {
            let oauth_string = Cookie_utility.getCookie("auth_obj");
            let oauth_date_string = Cookie_utility.getCookie("auth_date");
            if (!oauth_string || !oauth_date_string) {
                return true;
            }

            let oauth_obj = JSON.parse(oauth_string);
            let oauth_date = new Date(Date.parse(oauth_date_string));

            Fetch_util.oauth_object = oauth_obj;
            Fetch_util.oauth_time = oauth_date;
        }

        let curTime = new Date();
        if (curTime.getTime() > Fetch_util.oauth_time.getTime() ) {
            return true;
        }

        return false;
    }

    static getURIEncodedObject(params) {
        var query = "";
        for (let key in params) {
            query += encodeURIComponent(key)+"="+encodeURIComponent(params[key])+"&";
        }
        query = query.substr(0, query.length - 1);
        return query;
    }

    /**
     * oauth
     * @param userName
     * @param password
     * @param cb callback, (true) if succeed, (false) if failed
     */
    static startAuth(userName, password, cb) {
        //url direct
        let authCode = "Basic " + btoa("fooClientIdPassword:secret");
        let authObject = {
            grant_type:'password',
            username: userName,
            password: password
        };

        let body = Fetch_util.getURIEncodedObject(authObject);

        fetch('http://localhost:8080/oauth/token', {
            method: 'POST',
            headers: {
                "Authorization": authCode,
                "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
            },
            body:body
        }).then((resp)=>{
            if (resp.ok) {
                return resp.json();
            }
        }).then((jsonResp)=>{
            let curTime = new Date();
            let targetTime = curTime.getTime() + jsonResp.expires_in * 1000;
            Fetch_util.oauth_object = jsonResp;
            Fetch_util.oauth_time = new Date(targetTime);

            Cookie_utility.setCookie('auth_obj', JSON.stringify(jsonResp));
            Cookie_utility.setCookie('auth_date', Fetch_util.oauth_time.toString());

            cb(true);
        }).catch((e)=> {
            cb(false);
        });
    }

    static fetchGetRequest(uri, para_obj,cb) {

    }

    static fetchPostRequest(uri, sendDataObj, cb) {

    }


    static checkAndLoadAuthFromSession() {

    }
}


Fetch_util.checkAndLoadAuthFromSession();

export default Fetch_util;







