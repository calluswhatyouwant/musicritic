/* @flow */

import config from '../config';
import axios from 'axios';
import * as spotify from 'spotify-web-sdk';
import * as qs from 'querystring';

export const spotifySdk = spotify;

export const initSpotifyToken = () => {
    const authorization = `${config.spotify.clientId}:${config.spotify.clientSecret}`;
    const buff = new Buffer(authorization);
    spotify.init({
        token: 'token',
        refreshTokenFunction: async () => {
            const { data } = await axios.post(
                `${config.spotify.authBaseUri}/api/token`,
                qs.stringify({
                    grant_type: 'client_credentials',
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${buff.toString('base64')}`,
                    },
                }
            );
            return data.access_token;
        },
    });
};

export const generateRandomState = (length: number) => {
    let state = '';
    const letters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i += 1) {
        state += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return state;
};

export const getSpotifyAuthUrl = (urlPath: string) =>
    `${config.spotify.authBaseUri}${urlPath}`;

export const getSpotifyUrl = (urlPath: string) =>
    `${config.spotify.baseUri}${urlPath}`;

export const getHostUrl = (urlPath: string) => {
    if (config.host.production) return `${config.host.baseUri}${urlPath}`;
    return `${config.host.baseUri}:${config.host.port}${urlPath}`;
};

export const getClientUrl = (urlPath: string) =>
    `${config.client.baseUrl}${urlPath}`;

const getApplicationToken = () => {
    let tokenToEncrypt = '';
    if (config.spotify.clientId && config.spotify.clientSecret) {
        tokenToEncrypt = `${config.spotify.clientId}:${config.spotify.clientSecret}`;
    }
    return `Basic ${Buffer.from(tokenToEncrypt).toString('base64')}`;
};

export const getCurrentUser = async (token: string) => {
    const response = await axios.get(getSpotifyUrl('/me'), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return {
        displayName: response.data.display_name,
        email: response.data.email,
        emailVerified: false,
        photoURL: response.data.images[0]?.url,
        uid: response.data.uri,
    };
};

export const getTokenReqOptions = (form: any) => ({
    url: getSpotifyAuthUrl('/api/token'),
    headers: {
        Authorization: getApplicationToken(),
    },
    form,
    json: true,
});
