/* @flow */

export class Artist {
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

export class Album {
    artists: Array<Artist>;
    id: string;
    imageUrl: string;
    name: string;
    releaseDate: string;

    constructor(albumJson: any) {
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
}

export class Playlist {
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

export class AudioFeatures {
    danceability: number;
    energy: number;
    key: number;
    loudness: number;
    mode: number;
    speechiness: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    valence: number;
    tempo: number;

    constructor(audioFeaturesJson: any) {
        if (audioFeaturesJson) {
            this.danceability = audioFeaturesJson.danceability;
            this.energy = audioFeaturesJson.energy;
            this.key = audioFeaturesJson.key;
            this.loudness = audioFeaturesJson.loudness;
            this.mode = audioFeaturesJson.mode;
            this.speechiness = audioFeaturesJson.speechiness;
            this.acousticness = audioFeaturesJson.acousticness;
            this.instrumentalness = audioFeaturesJson.instrumentalness;
            this.liveness = audioFeaturesJson.liveness;
            this.valence = audioFeaturesJson.valence;
            this.tempo = audioFeaturesJson.tempo;
        }
    }

    static rankFeatureLikelihood(feature: number) {
        if (feature > 0.9) {
            return 'MOST CERTAINLY';
        } else if (feature > 0.8) {
            return 'VERY LIKELY';
        } else if (feature > 0.7) {
            return 'LIKELY';
        }
        return '';
    }

    static rankFeature(feature: number) {
        if (feature > 0.85) {
            return 'VERY HIGH';
        } else if (feature > 0.75) {
            return 'HIGH';
        } else if (feature > 0.5) {
            return 'MEDIUM HIGH';
        } else if (feature > 0.25) {
            return 'MEDIUM LOW';
        } else if (feature > 0.15) {
            return 'LOW';
        }
        return 'VERY LOW';
    }

    get tags() {
        const tags = [];

        tags.push(
            {
                feature: 'TEMPO',
                value: `${Math.round(this.tempo)} BPM`,
            },
            {
                feature: 'ACOUSTIC',
                value: AudioFeatures.rankFeatureLikelihood(this.acousticness),
            },
            {
                feature: 'DANCEABILITY',
                value: AudioFeatures.rankFeature(this.danceability),
            },
            {
                feature: 'ENERGY',
                value: AudioFeatures.rankFeature(this.danceability),
            },
            {
                feature: 'INSTRUMENTAL',
                value: AudioFeatures
                    .rankFeatureLikelihood(this.instrumentalness),
            },
            {
                feature: 'LIVE',
                value: AudioFeatures.rankFeatureLikelihood(this.liveness),
            },
            {
                feature: 'POSITIVENESS',
                value: AudioFeatures.rankFeature(this.valence),
            },
        );

        return tags;
    }
}
