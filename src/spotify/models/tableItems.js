export class TableItem {
    get values() {
        return Object.keys(this).map(key => this[key]);
    }
}

export class TableTrack extends TableItem {
    constructor (trackJson) {
        super();
        this.imageUrl = trackJson.album.images[0].url;
        this.name = trackJson.name;
        this.artist = trackJson.artists[0].name;
    }
}

export class TableAlbum extends TableItem {
    constructor (albumJson) {
        super();
        this.imageUrl = albumJson.images[0].url;
        this.name = albumJson.name;
        this.artist = albumJson.artists[0].name;
    }
}

export class TableArtist extends TableItem {
    constructor (artistJson) {
        super();
        if (artistJson.images.length > 0)
            this.imageUrl = artistJson.images[0].url;
        else this.imageUrl = '';
        this.name = artistJson.name;
    }
}

export class TablePlaylist extends TableItem {
    constructor (playlistJson) {
        super();
        this.imageUrl = playlistJson.images[0].url;
        this.name = playlistJson.name;
        this.owner = playlistJson.owner.display_name || playlistJson.owner.id;
    }
}
