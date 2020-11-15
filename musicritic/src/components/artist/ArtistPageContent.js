/* @flow */

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Album, AlbumSimplified } from 'spotify-web-sdk';

import { getSeveralAlbums } from '../../api/SpotifyWebAPI';
import Rating from '../common/rating/Rating';
import Loading from '../common/loading/Loading';

import './ArtistPageContent.css';

type Props = {
  albums: AlbumSimplified[];
  singles: AlbumSimplified[];
};

const ArtistPageContent = ({ albums, singles }: Props) => {
  const [completeAlbums, setCompleteAlbums] = useState([]);
  const [completeSingles, setCompleteSingles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompleteAlbums() {
      const albumIds = albums.map(album => album.id);
      const albumsResponse = await getSeveralAlbums(albumIds);
      const singleIds = singles.map(single => single.id);
      const singlesResponse = await getSeveralAlbums(singleIds);

      setCompleteAlbums(albumsResponse);
      setCompleteSingles(singlesResponse);
      setLoading(false);
    }

    fetchCompleteAlbums();
  }, [albums, singles]);

  return loading || !completeAlbums || !completeSingles ? (
    <Loading />
  ) : (
    <div className="artist-page-content col-lg-8">
      <h1 className="discography-title">Discography</h1>
      <h2 className="discography-section-title">ALBUMS</h2>
      <DiscographySection albums={completeAlbums} />
      <h2 className="discography-section-title">SINGLES</h2>
      <DiscographySection albums={completeSingles} />
    </div>
  );
};

const filterMaxPopularity = (albums: Album[]): Album[] => (
  Object.values(albums.reduce((prev, curr) => {
    const accum = prev;
    accum[curr.name] = accum[curr.name] && accum[curr.name].popularity > curr.popularity ? accum[curr.name] : curr
    return accum;
  }, {}))
);

const DiscographySection = ({ albums }: { albums: Album[] }) => {
  const { push } = useHistory();
  const filteredAlbums = filterMaxPopularity(albums)
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    .slice(0, 10);

  return (
    <table className="table discography-section-table">
      {filteredAlbums.map(album => (
        <tr className="clickable p-2" onClick={() => push(`/album/${album.id}/`)}>
          <td className="discography-section-table-data">
            <img className="artist-discography-album-cover" src={album.imageUrl} alt={album.name} />
          </td>
          <td className="p-2">
            <span className="discography-section-album-name">{album.name}</span>
            <br />
            <span className="discography-section-album-details">
              {`${album.totalTracks} track${album.totalTracks > 1 ? 's' : ''} • ${album.releaseYear}`}
            </span>
          </td>
          <td className="discography-section-table-data text-center">
            Your Rating
            <br />
            <Rating initialValue={4} />
          </td>
          <td className="discography-section-table-data text-center">
            Average Rating
            <br />
            <Rating initialValue={4} displayOnly />
          </td>
        </tr>
      ))}
    </table>
  );
}

export default ArtistPageContent;
