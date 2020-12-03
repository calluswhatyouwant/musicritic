/* @flow */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Artist, Track } from 'spotify-web-sdk';

import Rating from '../common/rating/Rating';

import './ArtistPageSidebar.css';

type Props = {
    artist: Artist,
    topTracks: Track[],
    topTracksAverages: number[],
};

const ArtistPageSidebar = ({ artist, topTracks, topTracksAverages }: Props) => (
    <div className="col-lg-4 p-0 artist-page-sidebar text-light">
        <ArtistPhoto artist={artist} />
        <ArtistTopRatedTracks topTracks={topTracks} topTracksAverages={topTracksAverages} />
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
                <button className="artist-spotify">Open on Spotify</button>
            </div>
        </div>
    );
};

type TopRatedTracksProps = {
    topTracks: Track[],
    topTracksAverages: number[],
};

const ArtistTopRatedTracks = ({ topTracks, topTracksAverages }: TopRatedTracksProps) => {
    const body = topTracks.map((track, index) => (
        <ArtistTrackRow key={track.id} track={track} average={topTracksAverages[index]} trackIndex={index} />
    ));

    return (
        <div className="artist-top-rated-tracks">
            <h2>Popular Tracks</h2>
            <table className="table table-top-tracks album-tracklist-table">
                <tbody>{body}</tbody>
            </table>
        </div>
    );
};

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
                    src={track.album.imageUrl}
                    alt={track.albumName}
                />
            </td>
            <td>{track.name}</td>
            <td width="1%" className="no-break">
                {average > 0 ? <Rating initialValue={average} displayOnly /> : 'Not rated yet.'}
            </td>
        </tr>
    );
};

export default ArtistPageSidebar;
