/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    query: string,
}

const SearchResultsNav = ({ query }: Props) => (
    <ul className="nav justify-content-center">
        <li className="nav-item">
            <NavLink className="nav-link" to={`/search/tracks/${query}`}>
                Tracks
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to={`/search/albums/${query}`}>
                Albums
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to={`/search/artists/${query}`}>
                Artists
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to={`/search/playlists/${query}`}>
                Playlists
            </NavLink>
        </li>
    </ul>
);

export default SearchResultsNav;
