/* @flow */

import React from 'react';
import { CurrentlyPlaying } from 'spotify-web-sdk';

import CurrentlyPlayingTrack from './CurrentlyPlayingTrack';

type CurrentlyPlayingTrackSectionProps = {
    currentlyPlaying: CurrentlyPlaying,
    history: any,
};

const CurrentlyPlayingTrackSection = ({
    history, currentlyPlaying,
}: CurrentlyPlayingTrackSectionProps) => (
    <div
      className="user-page-section__container border container shadow-sm px-4"
    >
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
);

export default CurrentlyPlayingTrackSection;
