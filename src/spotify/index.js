import axios from 'axios';

import { TableTrack, TableAlbum, TableArtist, TablePlaylist } from './models/tableItems';

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

    search(query, type) {
        const params = {params: {q: query, type: type}};
        return this.axios.get('/search', params).then(response => (
            this.toTableItems(type, response.data)
        ));
    }

    toTableItems(type, data) {        
        switch (type) {
            case 'track':
                return this.toTableTracks(data.tracks.items);
                break;
            case 'album':
                return this.toTableAlbums(data.albums.items);
                break;
            case 'artist':
                return this.toTableArtists(data.artists.items);
                break;
            case 'playlist':
                return this.toTablePlaylists(data.playlists.items);
                break;
        }
    }

    toTableTracks(tracks) {
        return tracks.map(trackJson => new TableTrack(trackJson));
    }

    toTableAlbums(albums) {
        return albums.map(albumJson => new TableAlbum(albumJson));
    }

    toTableArtists(artists) {
        return artists.map(artistJson => new TableArtist(artistJson));
    }

    toTablePlaylists(playlists) {
        return playlists.map(playlistJson => new TablePlaylist(playlistJson));
    }
}

export default SpotifyWebApi;
