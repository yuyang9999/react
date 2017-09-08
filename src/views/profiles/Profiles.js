
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {createNewProfile, deleteProfiles, selectProfile, unselectProfile} from '../../store/actions';

import store from '../../store/store';



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

class DeleteProfile extends Component {
    constructor(props) {
        super(props);


    }

    componentWillMount() {
        console.log("will mount");
    }

    componentDidMount() {
        console.log('did mount');

        var self = this;

        this.unscribe = store.subscribe(()=> {
            const state = store.getState();
            if (state.selectedProfilesReducer.length >= 1) {
                self.btn.disabled = false;
            } else {
                self.btn.disabled = true;
            }
        })
    }

    componentWillUnmount() {
        this.unscribe();
    }

    handleDeleteBtnPressed(e) {
        let arr = store.getState().selectedProfilesReducer;
        store.dispatch(deleteProfiles(arr));
    }

    render() {
        return (
            <div>
                <button ref={(ref) => this.btn = ref}
                    onClick={(e)=> {
                        this.handleDeleteBtnPressed(e);
                }}>
                    delete
                </button>
            </div>
        )
    }
}




class ProfileList extends Component {
    render() {
        return (
            <ul>
                {
                    this.props.profiles.map((profile, idx)=> {
                    return <Profile profile={profile} key={idx} />
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

        if (checked) {
            store.dispatch(selectProfile(this.props.profile.name));
        } else {
            store.dispatch(unselectProfile(this.props.profile.name));
        }
    }

    render() {
        return (
            <li>
                <input type={'checkbox'} onChange={(e)=>this.checkStatusChanged(e)} ref={(ref)=>this.input = ref}>
                </input>
                <text>{this.props.profile.name}</text>
            </li>
        );
    }
}

Profile.propTypes = {
    profile: React.PropTypes.object.isRequired,
    profileOnChecked: React.PropTypes.func,
    profileOnUnChecked: React.PropTypes.func
};


class ProfileWrapper extends  Component {
    render() {
        const {dispatch, profiles} = this.props;

        return (
            <div>
                <AddProfile onAddClick={(name)=> dispatch(createNewProfile(name))}/>
                <DeleteProfile/>
                <ProfileList profiles={profiles} />
            </div>
        );
    }
}

//map from store to the properties
function select(state) {
    return {profiles: state.profilesReducer};
}


export default connect(select)(ProfileWrapper);

