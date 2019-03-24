/* @flow */

import React from 'react';
import { Track } from 'spotify-web-sdk';

import TrackCarousel from './TopTracksCarousel';

type TopTracksSectionProps = {
    history: any,
    topTracks: Track[],
};

const TopTracksSection = ({ history, topTracks }: TopTracksSectionProps) => (
    <div
      className="user-page-section__container border container shadow-sm"
    >
        <section className="user-page-section">
            <h2 className="user-page-section__title">
                Your top tracks
            </h2>
            <TrackCarousel
              history={history}
              tracks={topTracks}
            />
        </section>
    </div>
);

export default TopTracksSection;
