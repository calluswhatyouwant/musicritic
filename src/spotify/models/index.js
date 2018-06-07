/* @flow */

export class Artist {
    id: number;
    imageUrl: string = '';
    name: string;

    constructor(artistJson) {
        if (artistJson.images && artistJson.images.length > 0) {
            this.imageUrl = artistJson.images[0].url;
        }

        this.id = artistJson.id;
        this.name = artistJson.name;
    }
}

export class Album {
    artists: Array<Artist>;
    id: number;
    imageUrl: string;
    name: string;
    releaseDate: string;

    constructor(albumJson) {
        this.artists = albumJson.artists.map(artist => new Artist(artist));
        this.id = albumJson.id;
        this.imageUrl = albumJson.images[0].url;
        this.name = albumJson.name;
        this.releaseDate = albumJson.release_date;
    }

    get stringArtists() {
        const artistNames = this.artists.map(artist => artist.name);
        return artistNames.join(', ');
    }
}

export class Track {
    album: Album;
    artists: Array<Artist>;
    durationInMillis: number;
    id: number;
    imageUrl: string;
    name: string;

    constructor(trackJson) {
        this.album = new Album(trackJson.album);
        this.artists = trackJson.artists.map(artist => new Artist(artist));
        this.durationInMillis = trackJson.duration_ms;
        this.id = trackJson.id;
        this.name = trackJson.name;
    }

    get stringArtists() {
        const artistNames = this.artists.map(artist => artist.name);
        return artistNames.join(', ');
    }
}

export class Playlist {
    imageUrl: string;
    name: string;
    owner: string;
    
    constructor(playlistJson) {
        this.imageUrl = playlistJson.images[0].url;
        this.name = playlistJson.name;
        this.owner = playlistJson.owner.display_name || playlistJson.owner.id;
    }
}
