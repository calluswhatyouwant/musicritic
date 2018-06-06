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
        this.artists = albumJson.artists.map(artist => new Artist(artist));
    }

    get stringArtists() {
        const artistNames = this.artists.map(artist => artist.name);
        return artistNames.join(', ');
    }
}

export class Artist {
    constructor(artistJson) {
        if (artistJson.images && artistJson.images.length > 0) {
            this.imageUrl = artistJson.images[0].url;
        } else {
            this.imageUrl = 'https://image.freepik.com/free-icon/male-user-shadow_318-34042.jpg';
        }

        this.id = artistJson.id;
        this.name = artistJson.name;
    }
}

export class Playlist {
    constructor(playlistJson) {
        this.imageUrl = playlistJson.images[0].url;
        this.name = playlistJson.name;
        this.owner = playlistJson.owner.display_name || playlistJson.owner.id;
    }
}
