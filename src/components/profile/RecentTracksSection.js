/* @flow */

import React from 'react';
import { PlayHistory } from 'spotify-web-sdk';

import RecentTracksCarousel from './RecentTracksCarousel';

type RecentTracksSectionProps = {
    history: any,
    recentTracks: PlayHistory[],
};

const RecentTracksSection = ({
    history, recentTracks,
}: RecentTracksSectionProps) => (
    <div
      className="user-page-section__container border container shadow-sm"
    >
        <section className="user-page-section">
            <h2 className="user-page-section__title">
                Recently played tracks
            </h2>
            <RecentTracksCarousel
              history={history}
              tracks={recentTracks}
            />
        </section>
    </div>
);

export default RecentTracksSection;
