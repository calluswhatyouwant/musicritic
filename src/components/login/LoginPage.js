import React, { Component } from 'react';

import LoginButton from './LoginButton';

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="text-center">
                <h1>Login to Spotify</h1>
                <LoginButton urlToAuth={`${process.env.SERVER_BASE_URI}/auth/login`} />
            </div>
        );
    }
}

export default LoginPage;
