/* @flow */

import React from 'react';
import { CurrentlyPlaying, Track } from 'spotify-web-sdk';

import CustomPalette from '../common/palette/CustomPalette';

import './CurrentlyPlayingTrack.css';

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
            <CustomPalette imageUrl={currentlyPlaying.item.album.imageUrl}>
                <div
                  className="currently-playing-track shadow row"
                  {...clickableProps}
                >
                    <CurrentlyPlayingTrackImage
                      track={currentlyPlaying.item}
                    />
                    <CurrentlyPlayingTrackInfo
                      track={currentlyPlaying.item}
                    />
                </div>
            </CustomPalette>
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
          src={track.album.imageUrl}
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
            <h3 className="text-truncate">
                {track.stringArtists}
            </h3>
            <h1 className="display-4 text-truncate">
                {track.name}
            </h1>
            <h4 className="text-truncate">
                From the album <i>{track.album.name}</i>
            </h4>
        </article>
    </div>
);

export default CurrentlyPlayingTrack;
