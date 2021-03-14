/* @flow */

import React, { Fragment } from 'react';
import { Album, AlbumSimplified, ArtistSimplified } from 'spotify-web-sdk';

import AlbumData from './AlbumData';
import AlbumMenu from './AlbumMenu';
import ArtistAlbumsGrid from './ArtistAlbumsGrid';
import AlbumTracklistTable from './AlbumTracklistTable';

import './AlbumSummary.css';
import { FormattedMessage } from 'react-intl';

type Props = {
    album: Album,
    userRating: number,
    averageRating: number,
    artistAlbums?: AlbumSimplified[],
    mainArtist: ArtistSimplified,
    postRating: (rating: number) => void,
};

const AlbumSummary = ({ album, artistAlbums, mainArtist, userRating, averageRating, postRating }: Props) => {
    const style = {
        backgroundImage: `url(${album.images[0].url})`,
    };

    return (
        <Fragment>
            <div className="album-summary text-light" style={style}>
                <AlbumData album={album} averageRating={averageRating} userRating={userRating} postRating={postRating} />
                <AlbumMenu albumUrl={album.externalUrls ? album.externalUrls.spotify : ''} />
            </div>
            <div>
                <div className="album-tracklist-title text-light text-center">
                    <FormattedMessage id="tracklist" />
                </div>
                <AlbumTracklistTable album={album} />
            </div>
            {artistAlbums && (
                <ArtistAlbumsGrid
                    currentAlbumId={album.id}
                    mainArtist={mainArtist}
                    artistAlbums={artistAlbums}
                />
            )}
        </Fragment>
    );
};

AlbumSummary.defaultProps = {
    artistAlbums: undefined,
}

export default AlbumSummary;
