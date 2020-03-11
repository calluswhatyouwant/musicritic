/* @flow */

import React, { useState, useEffect, Fragment } from 'react';
import { getCurrentUserCurrentlyPlayingTrack } from '../../api/SpotifyWebAPI';
import { useInterval } from '../../utils/hooks';
import CurrentlyPlayingTrack from './CurrentlyPlayingTrack';

type CurrentlyPlayingTrackSectionProps = {
    history: any,
};

const CurrentlyPlayingTrackSection = ({
    history,
}: CurrentlyPlayingTrackSectionProps) => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState({});

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
