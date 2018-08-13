/* @flow */

import Artist from './Artist';

class Album {
    artists: Array<Artist>;
    id: string;
    imageUrl: string;
    name: string;
    releaseDate: string;

    constructor(albumJson: any) {
        if (albumJson) {
            this.artists = albumJson.artists.map(artist => new Artist(artist));
            this.id = albumJson.id;
            this.imageUrl = albumJson.images[0].url;
            this.name = albumJson.name;
            this.releaseDate = albumJson.release_date;
        }
    }

    get stringArtists() {
        const artistNames = this.artists.map(artist => artist.name);
        return artistNames.join(', ');
    }
}

export default Album;
