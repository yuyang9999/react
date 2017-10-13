import BaseView from './baseView';
import React, {Component} from 'react';
import Profile_reqs from '../requests/profiles_reqs';
import {Link} from 'react-router-dom';

class OneProfileView extends Component {
    render() {
        return (
            <li>
                <Link to={'/profile/' + this.props.profile.pname}>
                    <text>{this.props.profile.pname}</text>
                </Link>
                <button onClick={(evt)=> {
                    this.props.deleteProfile();
                }}>x</button>
            </li>
        );
    }
}

class ProfileView extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            profiles: [],
        };
    }


    componentWillMount() {
        super.componentWillMount();
        this.refreshProfiles();

    }

    refreshProfiles() {
        let self = this;

        Profile_reqs.getProfiles((resp)=> {
            if (!resp.hasError) {
                self.setState({profiles: resp.response});
            }
        });
    }

    render() {
        let self = this;

        return (
            <div>
                <input type={"text"} placeholder={"new profile name"} ref={(ref)=> {this.addProfileInput = ref;}}/>
                <button onClick={(evt)=> {
                    let profileName = self.addProfileInput.value;
                    if (!profileName) {
                        alert('profile name is not valid');
                        return;
                    }

                    Profile_reqs.createProfile(profileName, ((resp)=> {
                        if (!resp.hasError) {
                            self.refreshProfiles();
                        } else {
                            alert(resp.errorMsg);
                        }
                    }));

                }}>add</button>
                <ul>
                    {
                        this.state.profiles.map((profile, idx)=> {
                            return <OneProfileView profile={profile} key={profile.pid} deleteProfile={()=> {
                                Profile_reqs.deleteProfile(profile.pname, (resp)=> {
                                    if (!resp.hasErrors) {
                                        self.refreshProfiles();
                                    }
                                });
                            }}/>
                        })
                    }
                </ul>

                this is profile view
            </div>
        )
    }
}

export default ProfileView;