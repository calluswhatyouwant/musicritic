/* @flow */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

type Props = {
    query: string,
}

const SearchResultsNav = ({ query }: Props) => (
    <div className="d-flex justify-content-center">
        <NavLink className="nav-link text-dark border border-dark p-2 mr-2" to={`/search/tracks/${query}`}>
            <FormattedMessage id="tracks" />
        </NavLink>
        <NavLink className="nav-link text-dark border border-dark p-2 mr-2" to={`/search/albums/${query}`}>
            <FormattedMessage id="albums" />
        </NavLink>
        <NavLink className="nav-link text-dark border border-dark p-2" to={`/search/artists/${query}`}>
            <FormattedMessage id="artists" />
        </NavLink>
    </div>
);

export default SearchResultsNav;
