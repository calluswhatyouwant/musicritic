/* @flow */

import axios from 'axios';

const getAxiosInstance = () => {
    const token = localStorage.getItem('token') || '';
    const config = {
        baseURL: 'https://api.spotify.com/v1',
        headers: { Authorization: `Bearer ${token}` },
    };

    return axios.create(config);
};

export const getRecentlyPlayedTracks = async () => {
    const params = { params: { limit: 50 } };
    const response = await getAxiosInstance()
        .get('/me/player/recently-played', params);
    return response.data.items;
};

export const getTopPlayedTracks = async () => {
    const params = { params: { limit: 50, time_range: 'short_term' } };
    const response = await getAxiosInstance()
        .get('/me/top/tracks', params);
    return response.data.items;
};

export const search = async (query: string) => {
    const params = {
        params: { q: query, type: 'track,artist,album,playlist' },
    };
    const response = await getAxiosInstance()
        .get('/search', params);
    return response.data;
};

export const getTrackInfo = async (id: string) => {
    const response = await getAxiosInstance()
        .get(`/tracks/${id}`);
    return response.data;
};
