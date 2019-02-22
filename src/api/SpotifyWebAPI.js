/* @flow */

import * as spotify from 'spotify-web-sdk';
import { userApi } from './UserAPI';

const token = localStorage.getItem('token') || '';
const refreshToken = localStorage.getItem('refresh') || '';
const refreshTokenFunction = async () => {
    const { data } = await userApi.post('/auth/refresh', {
        refresh_token: refreshToken,
    });
    localStorage.setItem('token', data.token);
    return data.token;
};

spotify.init({ token, refreshToken, refreshTokenFunction });

export const getRecentlyPlayedTracks = () =>
    spotify
        .getCurrentUserRecentlyPlayedTracks({ limit: 50 })
        .then(page => page.items);

export const getTopPlayedTracks = async () =>
    spotify
        .getCurrentUserTopTracks({ limit: 50, time_range: 'short_term' })
        .then(page => page.items);

export const search = async (query: string) =>
    spotify.search(query, 'album,artist,playlist,track', { limit: 50 });

export const getTrack = async (id: string) => spotify.getTrack(id);

export const getAudioFeaturesForTrack = async (id: string) =>
    spotify.getAudioFeaturesForTrack(id);

export const getCurrentUserCurrentlyPlayingTrack = async () =>
    spotify.getCurrentUserCurrentlyPlayingTrack();
