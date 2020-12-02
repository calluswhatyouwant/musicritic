/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    query: string,
}

const SearchResultsNav = ({ query }: Props) => (
    <div className="d-flex justify-content-center">
        <NavLink className="nav-link text-dark border border-dark p-2 mr-2" to={`/search/tracks/${query}`}>
            TRACKS
        </NavLink>
        <NavLink className="nav-link text-dark border border-dark p-2 mr-2" to={`/search/albums/${query}`}>
            ALBUMS
        </NavLink>
        <NavLink className="nav-link text-dark border border-dark p-2" to={`/search/artists/${query}`}>
            ARTISTS
        </NavLink>
    </div>
);

export default SearchResultsNav;
