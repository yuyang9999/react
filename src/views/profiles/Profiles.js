
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {createNewProfile, deleteOneProfile} from '../../store/actions';


var profile_names = ['profile1', 'profile2', 'profile3'];



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
    render() {
        return (
            <li>
                <input type={'checkbox'}>
                </input>
                <text>{this.props.profile.name}</text>
            </li>
        );
    }
}

Profile.propTypes = {
    profile: React.PropTypes.object.isRequired,
};


class ProfileWrapper extends  Component {
    render() {
        const {dispatch, profiles} = this.props;

        return (
            <div>
                <AddProfile onAddClick={(name)=> dispatch(createNewProfile(name))}/>

                <ProfileList profiles={profiles} />
            </div>
        );
    }
}


function select(state) {
    return {profiles: state};
}


export default connect(select)(ProfileWrapper);

