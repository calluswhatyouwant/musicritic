/* @flow */

import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { signInWithToken } from '../../firebase/auth';
import { useSession } from '../app/App';

const Auth = () => {
    const { token, refresh, musicritic } = useParams();
    const user = useSession();

    useEffect(() => {
        const login = async () => {
            localStorage.setItem('spotifyToken', token);
            localStorage.setItem('spotifyRefresh', refresh);
            const credential = await signInWithToken(atob(musicritic));
            localStorage.setItem(
                'authToken',
                await credential.user.getIdToken()
            );
        };
        login();
    }, []);

    return user ? <Redirect to="/home" /> : <div>Logging in...</div>;
};

export default Auth;
