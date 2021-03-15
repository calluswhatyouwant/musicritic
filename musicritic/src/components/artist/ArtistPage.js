/* @flow */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getArtist } from '../../api/ArtistAPI';

import Loading from '../common/loading/Loading';
import ArtistPageContent from './ArtistPageContent';
import ArtistPageSidebar from './ArtistPageSidebar';

const ArtistPage = () => {
    const [artist, setArtist] = useState({});
    const [topTracks, setTopTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [topTracksAvgs, setTopTracksAvgs] = useState([]);
    const [albumsAvgs, setAlbumsAvgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        async function fetchArtist() {
            const {
                artist: artistResponse,
                topTracks: topTracksResponse,
                albums: albumsResponse,
                topTracksAverages,
                albumsAverages,
            } = await getArtist(id);

            setArtist(artistResponse);
            setTopTracks(topTracksResponse);
            setAlbums(albumsResponse);
            setAlbumsAvgs(albumsAverages);
            setTopTracksAvgs(topTracksAverages);
            setLoading(false);
        }

        fetchArtist();
    }, [id]);

    return !loading ? (
        <div className="row m-0">
            <ArtistPageSidebar
                topTracks={topTracks}
                topTracksAverages={topTracksAvgs}
                artist={artist}
            />
            <ArtistPageContent albums={albums} albumsAverages={albumsAvgs} />
        </div>
    ) : (
        <Loading />
    );
};

export default ArtistPage;
