/* @flow */

import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { getCurrentUserCurrentlyPlayingTrack } from '../../api/SpotifyWebAPI';
import { useInterval } from '../../utils/hooks';
import CurrentlyPlayingTrack from './CurrentlyPlayingTrack';

const CurrentlyPlayingTrackSection = () => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState({});
    const history = useHistory();

    useEffect(() => {
        getCurrentUserCurrentlyPlayingTrack().then(track =>
            setCurrentlyPlaying(track)
        );
    }, []);

    useInterval(() => {
        getCurrentUserCurrentlyPlayingTrack().then(track =>
            setCurrentlyPlaying(track)
        );
    }, 15000);

    return (
        <Fragment>
            {currentlyPlaying.isPlaying && (
                <div className="user-page-section__container border container shadow-sm px-4">
                    <section className="user-page-section">
                        <h2 className="user-page-section__title">
                            You are listening to
                        </h2>
                        <CurrentlyPlayingTrack
                            history={history}
                            currentlyPlaying={currentlyPlaying}
                        />
                    </section>
                </div>
            )}
        </Fragment>
    );
};

export default CurrentlyPlayingTrackSection;
