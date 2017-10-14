

import React, {Component} from 'react';


class Logout extends Component {
    render() {
        return (
            <div style={{position:'absolute', right:10, top:10}} >
                <button onClick={(evt) => {
                    this.props.history.replace('/login');
                }}> logout </button>
            </div>
        );
    }
}


export default Logout;