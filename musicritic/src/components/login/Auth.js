/* @flow */

import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Auth = props => {
    useEffect(() => {
        localStorage.setItem('token', props.match.params.token);
        localStorage.setItem('refresh', props.match.params.refresh);
    }, []);

    return <Redirect to="home" />;
};

export default Auth;
