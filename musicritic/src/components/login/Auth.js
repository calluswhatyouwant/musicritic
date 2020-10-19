/* @flow */

import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { signInWithToken } from '../../firebase/auth';
import { useSession } from '../app/App';

const Auth = () => {
    const { token, refresh, musicritic } = useParams();
    const user = useSession();

    useEffect(async () => {
        localStorage.setItem('spotifyRefresh', token);
        localStorage.setItem('refresh', refresh);
        const credential = await signInWithToken(atob(musicritic));
        localStorage.setItem('authToken', await credential.user.getIdToken())
    }, []);

    return user ? <Redirect to="/home" /> : <div>Logging in...</div>;
};

export default Auth;
