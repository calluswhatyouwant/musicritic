/* @flow */

import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Album } from 'spotify-web-sdk';

import AlbumTracklistTable from './AlbumTracklistTable';
import AlbumReviewList from './AlbumReviewList';

import './AlbumPageContent.css';

type Props = {
    album: Album,
};

const AlbumPageContent = ({ album }: Props) => (
    <Fragment>
        <AlbumContentTabs album={album} />
        <AlbumContentSwitch album={album} />
    </Fragment>
);

const AlbumContentTabs = ({ album }: Props) => (
    <Fragment>
        <a
          href={`/album/${album.id}/`}
          className="btn btn-dark album-content-tab"
          role="button"
        >
            TRACKLIST
        </a>
        <a
          href="reviews/"
          className="btn btn-dark album-content-tab"
          role="button"
        >
            REVIEWS
        </a>
    </Fragment>
);

const AlbumContentSwitch = ({ album }: Props) => (
    <Switch >
        <Route
          exact
          path="/album/:id"
          render={() => <AlbumTracklistTable album={album} />}
        />
        <Route
          exact
          path="/album/:id/reviews"
          render={() => <AlbumReviewList />}
        />
    </Switch>
);

export default AlbumPageContent;
