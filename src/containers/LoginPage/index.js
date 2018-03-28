import React, {Component} from 'react';

import LoginButton from '../../components/LoginButton';

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="text-center">
                <h1>Login to Spotify</h1>
                <LoginButton urlToAuth="http://localhost:5000/auth/login" />
            </div>
        );
    }
}

export default LoginPage;
