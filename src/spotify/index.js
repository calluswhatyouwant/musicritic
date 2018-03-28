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
        const params = {params: {limit: 50}};
        return this.axios.get('/me/player/recently-played', params).then(response =>
            response.data.items
        );
    }

    _search(query, type) {
        const params = {params: {q: query, type: type}};
        return this.axios.get('/search', params);
    }

    searchItems(query) {
        const types = 'album,artist,playlist,track';
        return this._search(query, types).then(response => response.data.tracks.items);
    }

    // async searchItems(query) {
    //     const types = 'album,artist,playlist,track';
    //     const response = await this._search(query, types);
    //     return response.data;
    // }

    // async searchAlbum(query) {
    //     const response = await this._search(query, 'album');
    //     return response.data.albums.items;
    // }
  
    // async searchArtist(query) {
    //     const response = await this._search(query, 'artist');
    //     return response.data.artists.items;
    // }

    // async searchPlaylist(query) {
    //     const response = await this._search(query, 'playlist');
    //     return response.data.playlists.items;
    // }
  
    // async searchTrack(query) {
    //     const response = await this._search(query, 'track');
    //     return response.data.tracks.items;
    // }
}

export default SpotifyWebApi;
