import axios from 'axios';

const userApi = axios.create({
    baseURL: process.env.SERVER_BASE_URI
});

export const createUser = user => {
    return userApi.post('/users', user)
        .then(result => result.data)
        .catch(error => {
            throw error.response.data;
        });
}