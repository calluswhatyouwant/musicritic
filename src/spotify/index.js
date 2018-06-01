import axios from 'axios';

export const getRecentlyPlayedTracks = async () => {
    const params = { params: { limit: 50 } };
    const response = await getAxiosInstance().get('/me/player/recently-played', params);
    return response.data.items;
}

export const search = async (query) => {
    const params = { params: { q: query, type: 'track,artist,album,playlist' } };
    const response = await getAxiosInstance().get('/search', params);
    return response.data;
}

const getAxiosInstance = () => {
    const config = {
        baseURL: 'https://api.spotify.com/v1',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    return axios.create(config);
}
