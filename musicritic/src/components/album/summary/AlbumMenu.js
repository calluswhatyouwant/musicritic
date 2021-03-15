/* @flow */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import './AlbumMenu.css';

type Props = {
    albumUrl: string,
};

const AlbumMenu = ({ albumUrl }: Props) => (
    <div className="album-menu">
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={albumUrl}
            className="btn album-menu__button album-menu__button--play text-light">
            <FormattedMessage id="open-on-spotify" />
        </a>
    </div>
);

export default AlbumMenu;
