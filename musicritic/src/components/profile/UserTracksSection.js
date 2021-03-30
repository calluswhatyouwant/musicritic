/* @flow */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
    getRecentlyPlayedTracks,
    getTopPlayedTracks,
} from '../../api/SpotifyWebAPI';

import TrackCarousel from './TopTracksCarousel';
import RecentTracksCarousel from './RecentTracksCarousel';

import './UserTracksSection.css';
import Loading from '../common/loading/Loading';
import { usePromise } from '../../utils/hooks';

const UserTracksSection = () => {
    const [display, setDisplay] = useState('TOP');
    const [recentTracks, , loadingRecent] = usePromise(
        getRecentlyPlayedTracks(),
        [],
        []
    );
    const [topTracks, , loadingTop] = usePromise(getTopPlayedTracks(), [], []);
    const history = useHistory();

    const handleClick = () => {
        setDisplay(display === 'TOP' ? 'RECENT' : 'TOP');
    };

    return loadingRecent || loadingTop ? (
        <Loading />
    ) : (
        <div className="user-page-section__container">
            <section className="user-page-section">
                <TracksSectionTop currentTab={display} onClick={handleClick} />
                <div className="px-3">
                    {display === 'TOP' && (
                        <TrackCarousel history={history} tracks={topTracks} />
                    )}
                    {display === 'RECENT' && (
                        <RecentTracksCarousel
                            history={history}
                            tracks={recentTracks}
                        />
                    )}
                </div>
            </section>
        </div>
    );
};

type TracksSectionTopProps = {
    currentTab: string,
    onClick: (display: string) => void,
};

const TracksSectionTop = ({ currentTab, onClick }: TracksSectionTopProps) => {
    const sectionTitle = {
        enabled: currentTab === 'TOP' ? 'top' : 'recent',
        disabled: currentTab === 'TOP' ? 'recent' : 'top',
    };

    return (
        <div className="row">
            <div className="col-auto mr-auto">
                <h2 className="user-page-section__title">
                    <FormattedMessage
                        id={`your-${sectionTitle.enabled}-tracks`}
                    />
                </h2>
            </div>
            <div className="col-auto tracks-section-switch">
                <button
                    className="btn tracks-section-switch__button"
                    onClick={onClick}>
                    <i className="fas fa-exchange-alt" />
                    <span className="tracks-section-switch__text">
                        <FormattedMessage
                            id={`show-your-${sectionTitle.disabled}-tracks`}
                        />
                    </span>
                </button>
            </div>
        </div>
    );
};

export default UserTracksSection;
