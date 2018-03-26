export class Track {
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

export class Album {
    constructor(albumJson) {
        this.id = albumJson.id;
        this.imageUrl = albumJson.images[0].url;
        this.name = albumJson.name;
        this.releaseDate = albumJson.release_date;
    }
}

export class Artist {
    constructor(artistJson) {
        this.id = artistJson.id;
        this.name = artistJson.name;
    }
}