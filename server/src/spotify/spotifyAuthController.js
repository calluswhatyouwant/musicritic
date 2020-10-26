/* @flow */

import express from 'express';
import querystring from 'querystring';
import request from 'request';

import config from '../config';
import { loginWithSpotify } from '../firebase/firebaseAuthServices';
import {
    generateRandomState,
    getSpotifyAuthUrl,
    getHostUrl,
    getClientUrl,
    getTokenReqOptions,
} from './util';

const router = express.Router();
const stateKey = 'spotify-auth-state';

router.get('/auth/login', (req, res) => {
    const state = generateRandomState(16);
    res.cookie(stateKey, state);
    res.redirect(
        getSpotifyAuthUrl('/authorize?') +
            querystring.stringify({
                response_type: 'code',
                client_id: config.spotify.clientId,
                scope: config.spotify.scope,
                redirect_uri: getHostUrl('/auth/callback'),
                state,
            })
    );
});

const requestForSpotifyUserToken = (req, res) => {
    res.clearCookie(stateKey);
    const { code } = req.query;
    const tokenRequestOptions = getTokenReqOptions({
        code,
        redirect_uri: getHostUrl('/auth/callback'),
        grant_type: 'authorization_code',
    });
    request.post(tokenRequestOptions, async (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const firebaseToken = await loginWithSpotify(body.access_token);
            res.redirect(
                getClientUrl(
                    `${config.client.successPath}` +
                        `/${body.access_token}/${
                            body.refresh_token
                        }/${Buffer.from(firebaseToken).toString('base64')}`
                )
            );
        } else {
            res.redirect(
                getClientUrl(config.client.errorPath) +
                    querystring.stringify({ error: 'invalid_token' })
            );
        }
    });
};

router.get('/auth/callback', (req, res) => {
    const { state } = req.query;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
    if (!state || state !== storedState) {
        res.redirect(
            getClientUrl(config.client.errorPath) +
                querystring.stringify({ error: 'state_mismatch' })
        );
    } else {
        requestForSpotifyUserToken(req, res);
    }
});

const requestForSpotifyRefreshToken = (req, res, refresh) => {
    res.clearCookie(stateKey);
    const tokenRequestOptions = getTokenReqOptions({
        redirect_uri: getHostUrl('/auth/callback'),
        grant_type: 'refresh_token',
        refresh_token: refresh,
    });
    request.post(tokenRequestOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.status(200).send({ token: body.access_token });
        }
    });
};

router.post('/auth/refresh', (req, res) => {
    requestForSpotifyRefreshToken(req, res, req.body.refresh_token);
});

export default router;
