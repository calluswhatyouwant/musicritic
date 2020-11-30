/* @flow */

import React from 'react';
import { ArtistSimplified, AlbumSimplified } from 'spotify-web-sdk';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import './ArtistAlbumsGrid.css';

type Props = {
    mainArtist: ArtistSimplified,
    artistAlbums: AlbumSimplified[],
    currentAlbumId: string,
    history: any,
};

const ArtistAlbumsGrid = ({
    mainArtist, artistAlbums, currentAlbumId, history,
}: Props) => {
    const albums = artistAlbums.slice(0, 5).map(album => (
        <div className="artist-album-grid__item col-4">
            <ArtistAlbum
              album={album}
              isCurrent={currentAlbumId === album.id}
              history={history}
            />
        </div>
    ));

    const nextAlbumUrl = _.get(artistAlbums[5], 'imageUrl', '');
    const moreAlbumsButton = (
        <div className="artist-album-grid__item col-4">
            <MoreAlbumsButton artist={mainArtist} nextAlbum={nextAlbumUrl} />;
        </div>
    );

    return (
        <div className="artist-albums-grid bg-dark">
            <h5 className="artist-albums-grid__title text-light">
                {`Latest albums by ${mainArtist.name}:`}
            </h5>
            <div className="artist-albums-grid__content row">
                {albums}
                {nextAlbumUrl ? moreAlbumsButton : null}
            </div>
        </div>
    );
};

type MoreAlbumsButtonProps = {
    artist: ArtistSimplified,
    nextAlbum: string,
}

const MoreAlbumsButton = ({ artist, nextAlbum }: MoreAlbumsButtonProps) => (
    <div
      className="more-albums-button"
      style={{ backgroundImage: `url(${nextAlbum})` }}
    >
        <div className="more-albums-button__content">
            <a
              href={`/artist/${artist.id}/`}
              className="btn more-albums-button__link text-light"
              role="button"
            >
                <i className="fas fa-plus" />
            </a>
        </div>
    </div>
);

type ArtistAlbumProps = {
    album: AlbumSimplified,
    isCurrent: boolean,
    history: any,
};

const ArtistAlbum = ({ album, isCurrent, history }: ArtistAlbumProps) => {
    const clickableProps = {
        onClick: () => history.push(`/album/${album.id}/`),
        tabIndex: 0,
        onKeyPress: () => {},
        role: 'button',
    };

    return (
        <img
          alt={album.name}
          className={`artist-album ${isCurrent ? 'artist-album--current' : ''}`}
          src={album.images[0].url}
          title={`${album.name} (${album.releaseYear})`}
          {...clickableProps}
        />
    );
};

export default withRouter(ArtistAlbumsGrid);
