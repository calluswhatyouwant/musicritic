/* @flow */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Artist, Track } from 'spotify-web-sdk';

import Rating from '../common/rating/Rating';

import './ArtistPageSidebar.css';

type TrackWithRating = Track & { average: number };

type Props = {
    artist: Artist,
    topTracks: Track[],
    topTracksAverages: number[],
    bestRatedTracks: TrackWithRating[],
};

const ArtistPageSidebar = ({
    artist,
    topTracks,
    topTracksAverages,
    bestRatedTracks,
}: Props) => (
    <div className="col-lg-4 p-0 artist-page-sidebar text-light">
        <ArtistPhoto artist={artist} />
        <ArtistTopRatedTracks
            topTracks={topTracks}
            topTracksAverages={topTracksAverages}
            bestRatedTracks={bestRatedTracks}
        />
    </div>
);

const ArtistPhoto = ({ artist }: { artist: Artist }) => {
    const style = {
        backgroundImage: `url(${artist.imageUrl})`,
    };

    return (
        <div className="artist-photo-container text-light" style={style}>
            <div className="artist-data">
                <img
                    className="artist-photo"
                    src={artist.imageUrl}
                    alt={artist.name}
                />
                <h1 className="artist-name">{artist.name}</h1>
                <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={
                        artist.externalUrls ? artist.externalUrls.spotify : ''
                    }
                    className="artist-spotify text-light">
                    <FormattedMessage id="open-on-spotify" />
                </a>
            </div>
        </div>
    );
};

type TopRatedTracksProps = {
    topTracks: Track[],
    topTracksAverages: number[],
    bestRatedTracks: Track[],
};

const ArtistTopRatedTracks = ({
    topTracks,
    topTracksAverages,
    bestRatedTracks,
}: TopRatedTracksProps) => (
    <div className="artist-top-rated-tracks">
        <h2>
            <FormattedMessage id="popular-tracks" />
        </h2>
        <table className="table table-top-tracks album-tracklist-table">
            <tbody>
                {topTracks.map((track, index) => (
                    <ArtistTrackRow
                        key={track.id}
                        track={track}
                        average={topTracksAverages[index]}
                        trackIndex={index}
                    />
                ))}
            </tbody>
        </table>
        <h2 className="pt-3">
            <FormattedMessage id="best-rated-tracks" />
        </h2>
        <table className="table table-top-tracks album-tracklist-table">
            <tbody>
                {bestRatedTracks.map((track, index) => (
                    <ArtistTrackRow
                        key={track.id}
                        track={track}
                        average={track.average}
                        trackIndex={index}
                    />
                ))}
            </tbody>
        </table>
    </div>
);

const ArtistTrackRow = ({
    track,
    trackIndex,
    average,
}: {
    track: Track,
    trackIndex: number,
    average: number,
}) => {
    const { push } = useHistory();
    return (
        <tr
            className="artist-track-row"
            onClick={() => push(`/track/${track.id}/`)}>
            <th className="album-tracklist-tr__track-index" scope="row">
                {`${trackIndex + 1}`}
            </th>
            <td width="1%">
                <img
                    className="artist-album-cover"
                    src={track?.album?.imageUrl}
                    alt={track.albumName}
                />
            </td>
            <td>{track.name}</td>
            <td width="1%" className="no-break d-none d-table-cell-sm">
                {average > 0 ? (
                    <Rating initialValue={average} displayOnly />
                ) : (
                    <FormattedMessage id="not-rated-yet" />
                )}
            </td>
        </tr>
    );
};

export default ArtistPageSidebar;
