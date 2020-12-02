/* @flow */

import React from 'react';
import { CurrentlyPlaying, Track } from 'spotify-web-sdk';

import './CurrentlyPlayingTrack.css';

type Props = {
    currentlyPlaying: CurrentlyPlaying,
};

const CurrentlyPlayingTrack = ({ currentlyPlaying }: Props) => {
    if (currentlyPlaying.isPlaying) {
        return (
            <div className="row m-0">
                <CurrentlyPlayingTrackImage
                    track={currentlyPlaying.item}
                />
                <CurrentlyPlayingTrackInfo
                    track={currentlyPlaying.item}
                />
            </div>
        );
    }

    return <div />;
};

type ImageProps = {
    track: Track,
};

const CurrentlyPlayingTrackImage = ({ track }: ImageProps) => (
    <div className="currently-playing-track-image__container col-xl-3 col-md-4">
        <img
            className="currently-playing-track-image"
            src={track.album.images[0].url}
            alt={track.name}
        />
    </div>
);

type InfoProps = {
    track: Track,
};

const CurrentlyPlayingTrackInfo = ({ track }: InfoProps) => (
    <div className="currently-playing-track-info col-xl-9 col-md-8">
        <article className="currently-playing-track-info__article">
            <h3 className="user-page-section__title mb-2">
                You are listening to
            </h3>
            <h1 className="display-4 text-truncate">
                <a className="text-light" href={`/track/${track.id}`}>
                    {track.name}
                </a>
            </h1>
            <h3 className="text-truncate">
                <a className="text-light" href={`/artist/${track.artists[0].id}`}>
                    {track.stringArtists}
                </a>
            </h3>
            <h4 className="text-truncate">
                From the album <i>
                    <a className="text-light" href={`/album/${track.album.id}`}>
                        {track.album.name}
                    </a>
                </i>
            </h4>
        </article>
    </div>
);

export default CurrentlyPlayingTrack;
