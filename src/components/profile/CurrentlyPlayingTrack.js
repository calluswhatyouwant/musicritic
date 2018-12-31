/* @flow */

import React from 'react';
import { CurrentlyPlaying, Track } from 'spotify-web-sdk';

type Props = {
    currentlyPlaying: CurrentlyPlaying,
    history: any,
};

const CurrentlyPlayingTrack = ({ currentlyPlaying, history }: Props) => {
    if (currentlyPlaying.isPlaying) {
        const clickableProps = {
            onClick: () => history.push(`/track/${currentlyPlaying.item.id}`),
            tabIndex: 0,
            onKeyPress: () => {},
            role: 'button',
        };

        return (
            <div className="border row" {...clickableProps}>
                <CurrentlyPlayingTrackImage
                  imageUrl={currentlyPlaying.item.album.imageUrl}
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
    imageUrl: string,
};

const CurrentlyPlayingTrackImage = ({ imageUrl }: ImageProps) => (
    <div className="current-track-img text-center col-xl-3 col-lg-4 col-md-5">
        <img className="current-track" src={imageUrl} alt="Top" />
    </div>
);

type InfoProps = {
    track: Track,
};

const CurrentlyPlayingTrackInfo = ({ track }: InfoProps) => (
    <div className="align-self-center col-xl-9 col-lg-8 col-md-7">
        <article className="current-track-info text-center">
            <h3 className="text-truncate">
                {track.stringArtists}
            </h3>
            <h1 className="display-4 text-truncate">
                {track.name}
            </h1>
            <h4 className="text-muted text-truncate">
                From the album <i>{track.album.name}</i>
            </h4>
        </article>
    </div>
);

export default CurrentlyPlayingTrack;
