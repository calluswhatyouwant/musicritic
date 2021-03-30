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
    const [bestRatedAlbums, setBestRatedAlbums] = useState([]);
    const [bestRatedTracks, setBestRatedTracks] = useState([]);
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
                bestRatedTracks: fetchRatedTracks,
                bestRatedAlbums: fetchRatedAlbums,
            } = await getArtist(id);

            setArtist(artistResponse);
            setTopTracks(topTracksResponse.slice(0, 5));
            setAlbums(albumsResponse);
            setAlbumsAvgs(albumsAverages);
            setTopTracksAvgs(topTracksAverages);
            setBestRatedAlbums(fetchRatedAlbums);
            setBestRatedTracks(fetchRatedTracks);
            setLoading(false);
        }

        fetchArtist();
    }, [id]);

    return !loading ? (
        <div className="row m-0">
            <ArtistPageSidebar
                topTracks={topTracks}
                topTracksAverages={topTracksAvgs}
                bestRatedTracks={bestRatedTracks}
                artist={artist}
            />
            <ArtistPageContent
                albums={albums}
                albumsAverages={albumsAvgs}
                bestRatedAlbums={bestRatedAlbums}
            />
        </div>
    ) : (
        <Loading />
    );
};

export default ArtistPage;
