import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getArtist, getArtistAlbums, getArtistTopTracks } from '../../api/SpotifyWebAPI';

import Loading from '../common/loading/Loading';
import ArtistPageContent from './ArtistPageContent';
import ArtistPageSidebar from './ArtistPageSidebar';

const ArtistPage = () => {
  const [artist, setArtist] = useState({});
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [singles, setSingles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchArtist() {
      const artistResponse = await getArtist(id);
      const topTracksResponse = await getArtistTopTracks(id);
      const albumsResponse = await getArtistAlbums(id, ['album']);
      const singlesResponse = await getArtistAlbums(id, ['single']);
      
      setArtist(artistResponse);
      setTopTracks(topTracksResponse);
      setAlbums(albumsResponse.items);
      setSingles(singlesResponse.items);
      setLoading(false);
    }

    fetchArtist();
  }, [id]);

  return !loading ? (
    <div className="row m-0">
      <ArtistPageSidebar topTracks={topTracks} artist={artist} />
      <ArtistPageContent artist={artist} albums={albums} singles={singles} />
    </div>
  ) : <Loading />;
};

export default ArtistPage;
