/* @flow */

import axios from 'axios';

export const userApi = axios.create({
    baseURL: process.env.SERVER_BASE_URL,
});

export const userApiauthenticated = axios.create({
    baseURL: process.env.SERVER_BASE_URL,
    headers: {
        Authorization: localStorage.getItem('authToken')
    }
});

export const createUser = (user: any) => userApi.post('/users', user)
    .then(result => result.data)
    .catch((error) => {
        throw error.response.data;
    });

export const postTrackRating = (
    trackID: string,
    rating: number
    ) => {
    userApiauthenticated.post(`track/${trackID}/reviews`, { rating })
    .then(result => result.data)
    .catch((error) => {
        throw error.response.data
    })
    }