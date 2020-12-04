/* @flow */

import axios from 'axios';

export const searchAPI = axios.create({
    baseURL: process.env.SERVER_BASE_URL,
});

export const search = (query: string) =>
    searchAPI
        .get(`search/${query}`)
        .then(result => result.data)
        .catch(error => {
            throw error.response.data;
        });
