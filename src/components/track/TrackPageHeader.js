/* @flow */

import React from 'react';
import { Track } from 'spotify-web-sdk';

import CustomPalette from '../common/palette/CustomPalette';
import SocialButton from '../common/social-button/SocialButton';

import './TrackPageHeader.css';

type Props = {
    track: Track,
};

const TrackPageHeader = ({ track }: Props) => (
    <CustomPalette imageUrl={track.album.imageUrl}>
        <div className="track-page-header">
            <div className="track-page-header__data">
                <img
                  alt="Album"
                  className="track-page-header__cover shadow-lg"
                  src={track.album.imageUrl}
                />
                <TrackInfo track={track} />
            </div>
        </div>
    </CustomPalette>
);

const TrackInfo = ({ track }: Props) => (
    <div className="text-center track-info">
        <h1>{track.name}</h1>
        <h4>by {track.stringArtists}</h4>
        <p>
            {track.albumName} &bull; {track.releaseYear} &bull; {track.length}
        </p>
        <SpotifyButton trackUrl={track.externalUrls.spotify} />
    </div>
);

type SpotifyButtonProps = {
    trackUrl: string,
};

const SpotifyButton = ({ trackUrl }: SpotifyButtonProps) => (
    <SocialButton name="spotify" url={trackUrl} content="PLAY TRACK" />
);

export default TrackPageHeader;
