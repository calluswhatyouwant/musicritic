import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import TrackResults from './results/TrackResults';

const SearchResult = ({results}) => (
    <Switch>
        <Route path="/search/tracks/**" render={(props) =>
            <TrackResults {...props} results={results.tracks.items} />} />
    </Switch>
);

export default SearchResult;