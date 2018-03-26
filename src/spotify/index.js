import axios from 'axios';

const config = {
    baseURL: 'https://api.spotify.com/v1',
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
};

class SpotifyWebApi {
    constructor() {
        this.axios = axios.create(config);
    }

    getRecentlyPlayedTracks() {
        return this.axios.get('/me/player/recently-played').then(response => response.data.items);
    }
}

export default SpotifyWebApi;
