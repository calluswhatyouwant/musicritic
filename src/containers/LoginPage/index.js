import React, {Component} from 'react';

import LoginButton from '../../components/LoginButton';

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <LoginButton />
            </div>
        );
    }
}

export default LoginPage;
