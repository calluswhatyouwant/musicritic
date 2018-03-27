import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Auth extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        localStorage.setItem('token', this.props.match.params.token);
        localStorage.setItem('refresh', this.props.match.params.refresh);
        this.props.history.replace('/home');
    }
    
    render() {
        return null;
    }
}

export default Auth;
