

import React, {Component} from 'react';
import Fetch_util from "../requests/fetch_utilis";

class Login extends Component {

    render() {
        let self = this;

        return (
            <div>
                <input type={"text"} placeholder={"userName"} ref={(ref)=>{this.userNameInput = ref;}}/>
                <br/>
                <input type={"text"} placeholder={"password"} ref={(ref)=>{this.passwordInput = ref;}}/>

                <br/>
                <button onClick={(evt)=> {
                    //handle the submit button click
                    let userName = self.userNameInput.value;
                    let password = self.passwordInput.value;

                    if (userName === "") {
                        alert("user name can't be empty");
                        return;
                    }
                    if (password === "") {
                        alert("password can't be empty");
                        return;
                    }

                    Fetch_util.startAuth(userName, password, (succeed)=> {
                        if (succeed) {
                            self.props.history.replace('/profiles')
                        } else {
                            alert('login failed');
                        }
                    });


                }}>submit</button>
                <button onClick={(evt)=>{
                    //register the user
                    self.props.history.replace("/register");
                }}>register</button>
            </div>
        )
    }
}

export default Login;