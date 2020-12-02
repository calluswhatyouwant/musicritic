/* @flow */

import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { getCurrentUserCurrentlyPlayingTrack } from '../../api/SpotifyWebAPI';
import { useInterval } from '../../utils/hooks';
import CurrentlyPlayingTrack from './CurrentlyPlayingTrack';

import CustomPalette from '../common/palette/CustomPalette';

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
                <CustomPalette imageUrl={currentlyPlaying.item.album.images[0].url}>
                    <div className="currently-playing-track user-page-section__container border container shadow-sm px-4">
                        <section className="user-page-section">
                            <CurrentlyPlayingTrack
                                history={history}
                                currentlyPlaying={currentlyPlaying}
                            />
                        </section>
                    </div>
                </CustomPalette>
            )}
        </Fragment>
    );
};

export default CurrentlyPlayingTrackSection;
