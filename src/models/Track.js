/* @flow */

import Album from './Album';
import Artist from './Artist';

class Track {
    album: Album;
    artists: Array<Artist>;
    durationInMillis: number;
    id: string;
    imageUrl: string;
    name: string;
    explicit: boolean;
    popularity: number;
    spotifyUrl: string;

    constructor(trackJson: any) {
        if (trackJson) {
            this.album = new Album(trackJson.album);
            this.artists = trackJson.artists.map(artist => new Artist(artist));
            this.durationInMillis = trackJson.duration_ms;
            this.id = trackJson.id;
            this.name = trackJson.name;
            this.explicit = trackJson.explicit;
            this.popularity = trackJson.popularity;
            this.spotifyUrl = trackJson.external_urls.spotify;
        }
    }

    get stringArtists() {
        const artistNames = this.artists.map(artist => artist.name);
        return artistNames.join(', ');
    }

    get popularityRank() {
        if (this.popularity >= 90) {
            return 'HIGHLY POPULAR';
        } else if (this.popularity >= 75) {
            return 'POPULAR';
        } else if (this.popularity >= 50) {
            return 'SOMEWHAT POPULAR';
        }
        return '';
    }

    get releaseYear() {
        return this.album.releaseDate.substring(0, 4);
    }

    get length() {
        const minutes = Math.floor(this.durationInMillis / 60000);
        const seconds = Math.floor((this.durationInMillis % 60000) / 1000);

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    get albumTitle() {
        return this.album.name;
    }
}

export default Track;
