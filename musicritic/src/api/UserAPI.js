/* @flow */

import axios from 'axios';

export const userApi = axios.create({
    baseURL: process.env.SERVER_BASE_URL,
});

export const createUser = (user: any) =>
    userApi
        .post('/users', user)
        .then(result => result.data)
        .catch(error => {
            throw error.response.data;
        });
