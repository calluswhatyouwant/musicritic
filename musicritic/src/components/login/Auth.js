/* @flow */

import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { signInWithToken } from '../../firebase/auth';
import { useSession } from '../app/App';

const Auth = () => {
    const { token, refresh, musicritic } = useParams();
    const user = useSession();

    useEffect(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('refresh', refresh);
        signInWithToken(atob(musicritic));
    }, []);

    return user ? <Redirect to="/home" /> : <div>Logging in...</div>;
};

export default Auth;
