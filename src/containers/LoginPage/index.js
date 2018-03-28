import React, {Component} from 'react';

import LoginButton from '../../components/LoginButton';

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <LoginButton urlToAuth="https://idontknowmyname.herokuapp.com/auth/login" />
            </div>
        );
    }
}

export default LoginPage;
