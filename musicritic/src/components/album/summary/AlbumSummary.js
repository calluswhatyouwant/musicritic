/* @flow */

import React, { Fragment } from 'react';
import { Album, AlbumSimplified, ArtistSimplified } from 'spotify-web-sdk';

import AlbumData from './AlbumData';
import AlbumMenu from './AlbumMenu';
import ArtistAlbumsGrid from './ArtistAlbumsGrid';

import './AlbumSummary.css';

type Props = {
    album: Album,
    artistAlbums: AlbumSimplified[],
    mainArtist: ArtistSimplified,
};

const AlbumSummary = ({ album, artistAlbums, mainArtist }: Props) => {
    const style = {
        backgroundImage: `url(${album.imageUrl})`,
    };

    return (
        <Fragment>
            <div className="album-summary text-light" style={style}>
                <AlbumData album={album} averageRating={3} userRating={3.5} />
                <AlbumMenu />
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
