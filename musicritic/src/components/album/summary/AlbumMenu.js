/* @flow */

import React from 'react';
// import { Album } from 'spotify-web-sdk';

import './AlbumMenu.css';

type Props = {
    albumUrl: string
}

const AlbumMenu = ({ albumUrl }: Props) => (
    <div className="album-menu">
        <a
          target="_blank"
          href={albumUrl}
          className="btn album-menu__button album-menu__button--play text-light"
        >
            Open on Spotify
        </a>
    </div>
);

export default AlbumMenu;
