/* @flow */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SearchResults } from 'spotify-web-sdk';

import TrackResults from './results/TrackResults';
import AlbumResults from './results/AlbumResults';
import ArtistResults from './results/ArtistResults';

type Props = {
    results: SearchResults,
};

const SearchResult = ({ results }: Props) => (
    <Switch>
        <Route
            path="/search/tracks/**"
            render={props => (
                <TrackResults {...props} results={results.tracks.items} />
            )}
        />
        <Route
            path="/search/albums/**"
            render={props => (
                <AlbumResults {...props} results={results.albums.items} />
            )}
        />
        <Route
            path="/search/artists/**"
            render={props => (
                <ArtistResults {...props} results={results.artists.items} />
            )}
        />
    </Switch>
);

export default SearchResult;
