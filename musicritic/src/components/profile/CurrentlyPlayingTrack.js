/** @jsx jsx */
/* @flow */

import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { CurrentlyPlaying, Track } from 'spotify-web-sdk';
import { keyframes, jsx, css } from '@emotion/core';

import './CurrentlyPlayingTrack.css';

type Props = {
    currentlyPlaying: CurrentlyPlaying,
};

const CurrentlyPlayingTrack = ({ currentlyPlaying }: Props) => {
    if (currentlyPlaying.isPlaying) {
        return (
            <div className="row m-0">
                <CurrentlyPlayingTrackImage track={currentlyPlaying.item} />
                <CurrentlyPlayingTrackInfo track={currentlyPlaying.item} />
            </div>
        );
    }

    return <div />;
};

type ImageProps = {
    track: Track,
};

const CurrentlyPlayingTrackImage = ({ track }: ImageProps) => (
    <div className="currently-playing-track-image__container col-12 col-xl-3 col-md-4 col-sm-5">
        <img
            className="currently-playing-track-image"
            src={track.album.images[0].url}
            alt={track.name}
        />
    </div>
);

type InfoProps = {
    track: Track,
};

const SlidingTitle = ({ track }: ImageProps) => {
    const [refContent, setRefContent] = useState(null);
    const [refContainer, setRefContainer] = useState(null);
    const [overflow, setOverflow] = useState(false);
    const [scrollWidth, setScrollWidth] = useState(0);

    useEffect(() => {
        setOverflow(
            refContent &&
                refContainer &&
                refContainer.clientWidth < refContent.scrollWidth
        );
        setScrollWidth(refContent && refContent.clientWidth);
    }, [track.name, refContent]);

    const slide = keyframes`
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-${scrollWidth}px) translateX(-4rem);
    }`;

    return (
        <div className="sliding-name-container">
            <a href={`/track/${track.id}`} className="text-light">
                <div
                    ref={useCallback(
                        node => {
                            if (node !== null) {
                                setRefContainer(node);
                            }
                        },
                        [track.name]
                    )}
                    css={css`
                        animation-name: ${slide};
                        display: flex;
                        justify-content: ${overflow ? 'left' : 'center'};
                        width: 100%;
                        transform: translate3d(0, 0, 0);
                    `}
                    className={`display-4 text-light ${
                        overflow ? 'animated-slide' : ''
                    }`}>
                    <p
                        ref={useCallback(
                            node => {
                                if (node !== null) {
                                    setRefContent(node);
                                }
                            },
                            [track.name]
                        )}
                        className="m-0">
                        {track.name}
                    </p>
                    {overflow && (
                        <p aria-hidden="true" className="pl-6 m-0">
                            {track.name}
                        </p>
                    )}
                </div>
            </a>
        </div>
    );
};

const CurrentlyPlayingTrackInfo = ({ track }: InfoProps) => (
    <div className="currently-playing-track-info col-12 col-xl-9 col-md-8 col-sm-7">
        <article className="currently-playing-track-info__article">
            <h3 className="user-page-section__title mb-2">
                <FormattedMessage id="listening-to" />
            </h3>
            <SlidingTitle track={track} />
            <h3>
                {track.artists.map(artist => (
                    <span className="artist-name-list">
                        <a className="text-light" href={`/artist/${artist.id}`}>
                            {artist.name}
                        </a>
                    </span>
                ))}
            </h3>
            <h4 className="currently-playing-track-album text-truncate">
                <FormattedMessage
                    id="from-the-album"
                    values={{
                        album: (
                            <i>
                                <a
                                    className="text-light"
                                    href={`/album/${track.album.id}`}>
                                    {track.album.name}
                                </a>
                            </i>
                        ),
                    }}
                />
            </h4>
        </article>
    </div>
);

export default CurrentlyPlayingTrack;
