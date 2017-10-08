


class Security {

    static accessToken = null;


    static getAccesstoken(cb) {
        let authCode = "Basic " + btoa("fooClientIdPassword:secret");

        fetch('http://localhost:8080/oauth/token', {
            method: 'POST',
            headers: {
                "Authorization": authCode,
                "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
            },
            body: "grant_type=password&username=tom&password=123456"
        }).then((resp)=> {
            if (resp.ok) {
                return resp.json();
            }
        }).then((jsonResp)=> {
            Security.oauthTestApi(jsonResp);
        }).catch((e)=> {
            cb(null);
            console.log(e);
        });
    }


    static oauthTestApi(tokenObj){
        console.log(tokenObj);
        const accessToken=tokenObj.access_token;
        const type=tokenObj.token_type;
        const headers={
            Authorization:"Bearer " + accessToken,
            'Accept': 'application/json'
        };
        console.log(headers);
        fetch("http://localhost:8080/api/profiles",{
            headers:headers,
        }).then((resp)=>{
            if(resp.ok){
                return resp.json();
            }
        }).then((jsResp)=>{
            console.log(jsResp);
        }).catch((e)=>{
            console.log(e);
        })
    }

}

export default Security;