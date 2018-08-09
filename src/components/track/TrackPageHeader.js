/* @flow */

import React from 'react';

import { Track } from '../../spotify/models';
import SocialButton from '../common/SocialButton';

type Props = {
    track: Track,
};

const Header = ({ track }: Props) => (
    <div className="header">
        <HeaderBackground imageUrl={track.album.imageUrl} />
        <HeaderContent track={track} />
    </div>
);

type BackgroundProps = {
    imageUrl: string,
};

const HeaderBackground = ({ imageUrl }: BackgroundProps) => {
    const style = {
        backgroundImage: `url(${imageUrl})`,
    };

    return (<div className="background" style={style} />);
};

const HeaderContent = ({ track }: Props) => (
    <div className="content">
        <img alt="Album" className="center-image" src={track.album.imageUrl} />
        <TrackInfo track={track} />
    </div>
);

const TrackInfo = ({ track }: Props) => (
    <div className="text-center">
        <h1>{ track.name }</h1>
        <h4>by { track.stringArtists }</h4>
        <p>
            {track.albumTitle} &bull; {track.releaseYear} &bull; {track.length}
        </p>
        <SpotifyButton trackUrl={track.spotifyUrl} />
    </div>
);

type SpotifyButtonProps = {
    trackUrl: string,
};

const SpotifyButton = ({ trackUrl }: SpotifyButtonProps) => (
    <SocialButton name="spotify" url={trackUrl} content="PLAY IT ON SPOTIFY" />
);

export default Header;
