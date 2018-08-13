/* @flow */

class AudioFeatures {
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

export default AudioFeatures;
