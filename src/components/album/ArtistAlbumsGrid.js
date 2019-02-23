/* @flow */

import React from 'react';
import { ArtistSimplified, AlbumSimplified } from 'spotify-web-sdk';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

type Props = {
    artist: ArtistSimplified,
    artistAlbums: AlbumSimplified[],
    currentAlbumId: string,
    history: any,
};

const ArtistAlbumsGrid = ({
    artist, artistAlbums, currentAlbumId, history,
}: Props) => {
    const albums = artistAlbums.slice(0, 5).map(album => (
        <ArtistAlbum
          album={album}
          isCurrent={currentAlbumId === album.id}
          history={history}
        />
    ));

    const nextAlbumUrl = _.get(artistAlbums, '[5].imageUrl', '');
    const moreAlbumsButton =
        <MoreAlbumsButton artist={artist} nextAlbum={nextAlbumUrl} />;

    return (
        <div className="bg-dark text-uppercase">
            <h5 className="py-3 mb-0 text-light text-center">
                {`Latest albums by ${artist.name}:`}
            </h5>
            <div className="row ml-0 mr-2 mb-n2">
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
    <div className="col-4 pl-2 pr-0 pb-2">
        <div
          className="more-albums-background"
          style={{ backgroundImage: `url(${nextAlbum})` }}
        >
            <div className="more-albums-layer">
                <a
                  href={`/artist/${artist.id}/`}
                  className="btn btn-more-albums text-light p-3 content"
                  role="button"
                >
                    Show more albums by <em>{artist.name}</em>
                </a>
            </div>
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
        <div className="col-4 pl-2 pr-0 pb-2" {...clickableProps}>
            <img
              alt={album.name}
              className={`artist-album ${isCurrent ? 'current-album' : ''}`}
              src={album.imageUrl}
              title={`${album.name} (${album.releaseYear})`}
            />
        </div>
    );
};

export default withRouter(ArtistAlbumsGrid);
