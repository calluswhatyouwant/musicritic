/* @flow */

class Artist {
    id: string;
    imageUrl: string = '';
    name: string;

    constructor(artistJson: any) {
        if (artistJson.images && artistJson.images.length > 0) {
            this.imageUrl = artistJson.images[0].url;
        }

        this.id = artistJson.id;
        this.name = artistJson.name;
    }
}

export default Artist;
