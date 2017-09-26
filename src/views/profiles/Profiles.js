import React, {Component} from 'react';
import {connect} from 'react-redux';

import ProfilesDM from '../../datamodels/ProfilesDataModel';
import Security from '../../datamodels/Security';
import {Link} from 'react-router-dom';


class AddProfile extends Component {
    handleClick(e) {
        const node = this.refs.input;
        const text = node.value.trim();
        this.props.onAddClick(text);
        node.value = "";
    }

    render() {
        return (
            <div>
                <input type={'text'} ref={'input'} />
                <button onClick={(e)=> {
                    this.handleClick(e)
                }}>Add</button>
            </div>
        )
    }
}

AddProfile.propTypes = {
    onAddClick: React.PropTypes.func.isRequired,
};


class ProfileList extends Component {
    render() {
        return (
            <ul>
                {
                    this.props.profiles.map((profile, idx)=> {
                        return <Profile profile={profile} key={profile.name} {...this.props} />
                    })
                }
            </ul>
        );
    }
}

ProfileList.propTypes = {
    profiles: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
    }).isRequired).isRequired,
};

class Profile extends Component {
    checkStatusChanged(evt) {
        const node = this.input;
        const checked = node.checked;

        this.props.profileChanged(this.props.profile.name, checked);
    }

    render() {
        return (
            <li>
                <input type={'checkbox'} onChange={(e)=>this.checkStatusChanged(e)} ref={(ref)=>this.input = ref}>
                </input>
                <Link to={'/profile/' + this.props.profile.name}>
                    <text>{this.props.profile.name}</text>
                </Link>
            </li>
        );
    }
}

Profile.propTypes = {
    profile: React.PropTypes.object.isRequired,
    profileChanged: React.PropTypes.func.isRequired,
};


class ProfileWrapper extends  Component {
    constructor(props) {
        super(props);

        // this.getProfiles((objs)=> {
        //     this.setState({
        //         profiles: objs,
        //     })
        // });

        Security.getAccesstoken(()=> {

        });

        this.state = {
            profiles: [],
            deleteBtnDisable: true,
        };

        this.selectedProfiles = new Set();
    }

    getProfiles(cb) {
        ProfilesDM.getProfiles((profiles)=> {
            let objs = profiles.map((elem, idx, arr)=> {
                return {name: elem};
            });

            cb(objs);
        });
    }


    render() {
        return (
            <div>
                <AddProfile onAddClick={(name)=> {
                    ProfilesDM.addOneProfile(name, (isSucceed)=> {
                        this.getProfiles((objs)=> {
                            this.setState({
                                profiles: objs,
                            })
                        });
                    })
                }}/>

                <div>
                    <button ref={(ref) => this.btn = ref} disabled={this.state.deleteBtnDisable}
                            onClick={(e)=> {
                                if (this.selectedProfiles.size === 0) {
                                    return;
                                }

                                const toDeleteArr = Array.from(this.selectedProfiles);
                                ProfilesDM.deleteOneProfile(toDeleteArr, (isSucceed)=> {
                                    if (isSucceed) {
                                        this.getProfiles((objs)=> {
                                            this.setState({
                                                profiles: objs,
                                            });
                                        })
                                    }
                                });
                                this.selectedProfiles.clear();
                                this.setState({
                                    deleteBtnDisable: true,
                                });
                            }}>
                        delete
                    </button>
                </div>

                <ProfileList profiles={this.state.profiles} profileChanged = {(proName, selected)=> {
                    if (selected) {
                        this.selectedProfiles.add(proName);
                    } else {
                        this.selectedProfiles.delete(proName);
                    }

                    if (this.selectedProfiles.size == 0) {
                        this.setState({
                            deleteBtnDisable: true,
                        });
                    } else {
                        this.setState({
                            deleteBtnDisable: false,
                        });
                    }
                }} />
            </div>
        );
    }
}

// //map from store to the properties
// function select(state) {
//     return {profiles: state.profilesReducer};
// }


export default ProfileWrapper;

