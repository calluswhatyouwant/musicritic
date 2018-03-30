import axios from 'axios';

const config = {
    baseURL: 'https://api.spotify.com/v1',
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
};

class SpotifyWebApi {
    constructor() {
        this.axios = axios.create(config);
    }

    async getRecentlyPlayedTracks() {
        const params = {params: {limit: 50}};
        const response = await this.axios('/me/player/recently-played', params);
        return response.data.items;
        
    }
}

export default SpotifyWebApi;
