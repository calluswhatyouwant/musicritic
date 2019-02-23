/* @flow */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Album } from 'spotify-web-sdk';
import _ from 'lodash';

type Props = {
    album: Album,
};

const AlbumPageContent = ({ album }: Props) => (
    <div className="container col-lg-6">
        <AlbumButtonGroup album={album} />
        <AlbumContentSwitch album={album} />
    </div>
);

const AlbumButtonGroup = ({ album }: Props) => (
    <React.Fragment>
        <a
          href={`/album/${album.id}/`}
          className="btn btn-dark rounded-0 mr-2"
          role="button"
        >
            TRACKLIST
        </a>
        <a
          href="reviews/"
          className="btn btn-dark rounded-0 mr-2"
          role="button"
        >
            REVIEWS
        </a>
    </React.Fragment>
);

const AlbumContentSwitch = ({ album }: Props) => (
    <Switch >
        <Route
          exact
          path="/album/:id"
          render={() => <TracklistTable album={album} />}
        />
        <Route
          exact
          path="/album/:id/reviews"
          render={() => <ReviewList />}
        />
    </Switch>
);

const TracklistTable = ({ album }: Props) => {
    const body = _.get(album, 'tracks.items', []).map((track, index) => (
        <tr>
            <th className="text-muted text-right" scope="row" width="1%">
                {`${index + 1}`}
            </th>
            <td>
                {track.name}
            </td>
            <td className="text-muted text-center" width="1%">
                {track.length}
            </td>
        </tr>
    ));

    return (
        <table className="table table-striped border" cellPadding="0">
            <tbody>
                {body}
            </tbody>
        </table>
    );
};

const ReviewList = () => (
    <div>
        <h1>Review list.</h1>
    </div>
);

export default AlbumPageContent;
