/* @flow */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

type Props = {
    query: string,
};

const SearchResultsNav = ({ query }: Props) => (
    <div className="d-flex justify-content-center">
        <NavLink
            activeClassName="search-nav-active"
            className="search-nav"
            to={`/search/tracks/${query}`}>
            <FormattedMessage id="tracks" />
        </NavLink>
        <NavLink
            activeClassName="search-nav-active"
            className="search-nav"
            to={`/search/albums/${query}`}>
            <FormattedMessage id="albums" />
        </NavLink>
        <NavLink
            activeClassName="search-nav-active"
            className="search-nav"
            to={`/search/artists/${query}`}>
            <FormattedMessage id="artists" />
        </NavLink>
    </div>
);

export default SearchResultsNav;
