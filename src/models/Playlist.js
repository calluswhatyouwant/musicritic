/* @flow */

class Playlist {
    id: string;
    imageUrl: string;
    name: string;
    owner: string;

    constructor(playlistJson: any) {
        this.id = playlistJson.id;
        this.imageUrl = playlistJson.images[0].url;
        this.name = playlistJson.name;
        this.owner = playlistJson.owner.display_name || playlistJson.owner.id;
    }
}

export default Playlist;
