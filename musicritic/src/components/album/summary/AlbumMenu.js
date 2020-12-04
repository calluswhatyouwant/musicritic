/* @flow */

import React from 'react';

import './AlbumMenu.css';

type Props = {
    albumUrl: string
}

const AlbumMenu = ({ albumUrl }: Props) => (
    <div className="album-menu">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={albumUrl}
          className="btn album-menu__button album-menu__button--play text-light"
        >
            Open on Spotify
        </a>
    </div>
);

export default AlbumMenu;
