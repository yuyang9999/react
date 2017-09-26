


class Security {
    static getAccesstoken(cb) {
        let authCode = "Basic " + btoa("fooClientIdPassword:secret");

        fetch('http://localhost:8080/SpringSecurityOAuth2Example/oauth/token', {
            method: 'POST',
            headers: {
                "Authorization": authCode,
                "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
            },
            body: "grant_type=password&username=john&password=123"
        }).then((resp)=> {
            if (resp.ok) {
                return resp.json();
            }
        }).then((jsonResp)=> {
            console.log(jsonResp);
        }).catch((e)=> {
            console.log(e);
        });
    }

    static getToken(cb) {

    }
}

export default Security;