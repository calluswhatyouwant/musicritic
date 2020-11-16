/* @flow */

import React, { Fragment } from 'react';
import { Album, AlbumSimplified, ArtistSimplified } from 'spotify-web-sdk';

import AlbumData from './AlbumData';
import AlbumMenu from './AlbumMenu';
import ArtistAlbumsGrid from './ArtistAlbumsGrid';
import AlbumTracklistTable from './AlbumTracklistTable';

import './AlbumSummary.css';

type Props = {
    album: Album,
    userRating: number,
    averageRating: number,
    artistAlbums: AlbumSimplified[],
    mainArtist: ArtistSimplified,
};

const AlbumSummary = ({ album, artistAlbums, mainArtist, userRating, averageRating }: Props) => {
    const style = {
        backgroundImage: `url(${album.imageUrl})`,
    };

    return (
        <Fragment>
            <div className="album-summary text-light" style={style}>
                <AlbumData album={album} averageRating={averageRating} userRating={userRating} />
                <AlbumMenu albumUrl={album.externalUrls ? album.externalUrls.spotify : ''} />
            </div>
            <div>
                <div className="album-tracklist-title text-light text-center">
                    Tracklist
                </div>
                <AlbumTracklistTable album={album} />
            </div>
            <ArtistAlbumsGrid
                currentAlbumId={album.id}
                mainArtist={mainArtist}
                artistAlbums={artistAlbums}
            />
        </Fragment>
    );
};

export default AlbumSummary;
