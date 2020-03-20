/* @flow */

import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

const Auth = () => {
    const { token, refresh } = useParams();
    useEffect(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('refresh', refresh);
    }, []);

    return <Redirect to="home" />;
};

export default Auth;
