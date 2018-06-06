import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        localStorage.setItem('token', this.props.match.params.token);
        localStorage.setItem('refresh', this.props.match.params.refresh);
    }

    render() {
        return <Redirect to="/home" />;
    }
}

export default Auth;
