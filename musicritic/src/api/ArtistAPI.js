/* @flow */

import axios from 'axios';

export const artistAPI = axios.create({
    baseURL: process.env.SERVER_BASE_URL,
    headers: {
        Authorization: localStorage.getItem('authToken'),
    },
});

export const getArtist = async (artistID: string) => {
    const artistResponse = await artistAPI.get(`artists/${artistID}`);
    return artistResponse.data;
}

export const getArtistAlbums = async (artistID: string) => {
    const artistResponse = await artistAPI.get(`artists/${artistID}`);
    const { albums } = artistResponse.data;
    return albums;
}
