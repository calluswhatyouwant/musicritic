/* @flow */

import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { signInWithToken } from '../../firebase/auth';
import { useSession } from '../app/App';

import Loading from '../common/loading/Loading';

const Auth = () => {
    const { token, refresh, musicritic } = useParams();
    const user = useSession();
    const history = useHistory();

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

    if (user && localStorage.getItem('spotifyToken')) { 
        history.push('/home');
    } 

    return <Loading />;
};

export default Auth;
