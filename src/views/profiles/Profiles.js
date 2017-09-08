
import React, {Component} from 'react';

var profile_names = ['profile1', 'profile2', 'profile3'];

class Profiles extends Component {
    constructor(props) {
        super(props);
    }

    deleteProfilesBtnPressed(evt) {
        console.log(evt.target);
    }

    render() {
        for(let i = 0; i < profile_names.length; i++) {
            let name = profile_names[i];
            console.log(name);
        }

        let children = [];
        profile_names.forEach((name, idx, arr)=> {
            children.push(<OneProfile name={name} />);
        });

        return (
            <div>
            <input type={'checkbox'} onInput={(evt)=> {
                console.log(evt);
                console.log(this);
            }} />
                <text>Edit</text>
                <button onClick={this.deleteProfilesBtnPressed} disabled={true}>delete</button>
                <br />
                <h1>this is second line</h1>
                {children}
            </div>
        );
    }
}



class OneProfile extends  Component {
    inputChanged(evt) {
        let target = evt.target;

        // this.props.selectFunction();
    }

    render() {
        return (
            <div>
                <input type={'checkbox'} onChange={this.inputChanged} />
                <text>{this.props.name}</text>
            </div>
        );
    }
}

OneProfile.propTypes = {
    name: React.PropTypes.string,
    selectFunction: React.PropTypes.func
};




export default Profiles;

