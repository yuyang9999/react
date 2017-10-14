

import React, {Component} from 'react';
import UserReq from '../requests/users_reqs';
import Fetch_util from '../requests/fetch_utilis';

class Register extends Component {
    render() {
        return (
            <div style={{display:'flex', justifyContent:'center', marginTop:10}}>
                <div>
                <input type={'text'} ref={(ref)=>this.username = ref} placeholder={'username'} />
                <br />
                <input type={'text'} ref={(ref)=>this.email = ref} placeholder={'email'} />
                <br />
                <input type={'text'} ref={(ref)=>this.password = ref} placeholder={'password'} />
                <br />
                    <div style={{display:'flex', justifyContent:'center', marginTop:10}}>
                        <button onClick={(evt)=> {
                            let username = this.username.value;
                            let email = this.email.value;
                            let password = this.password.value;

                            if (!username || !email ||!password) {
                                alert("can't be empty");
                                return;
                            }

                            UserReq.registerUser(username, email, password, (resp)=> {
                                if (resp.hasError) {
                                    alert(resp.errorMsg);
                                    return;
                                }

                                //start auth
                                Fetch_util.startAuth(username, password, (succeed)=> {
                                    if (succeed) {
                                        this.props.history.replace('/profiles');
                                    }
                                });
                            });

                        }}>register </button>
                    </div>
                </div>



            </div>
        );
    }
}

export default Register;