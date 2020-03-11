/* @flow */

import React from 'react';

import './AlbumMenu.css';

const AlbumMenu = () => (
    <div className="album-menu">
        <button
          type="button"
          className="btn album-menu__button album-menu__button--play text-light"
        >
            Play album
        </button>
        <button
          type="button"
          className="btn album-menu__button text-light"
        >
            Add to favorites
        </button>
        <button
          type="button"
          className="btn album-menu__button text-light"
        >
            Write a review
        </button>
    </div>
);

export default AlbumMenu;
