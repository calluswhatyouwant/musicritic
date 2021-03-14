import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Album, AlbumSimplified } from 'spotify-web-sdk';

import { getSeveralAlbums } from '../../api/AlbumAPI';
import objectToJson from '../../utils/objectToJson';
import Rating from '../common/rating/Rating';

import './ArtistPageContent.css';

type Props = {
    albums: AlbumSimplified[],
    albumsAverages: number[],
};

type AlbumWithRating = Album & { average: number };

const ArtistPageContent = ({ albums, albumsAverages }: Props) => {
    const [completeAlbums, setCompleteAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCompleteAlbums() {
            const albumIds = albums.map(album => album.id);
            const albumsResponse = await getSeveralAlbums(albumIds);
            const albumsWithAverages = albumsResponse.map((a, index) => ({ ...objectToJson(a), average: albumsAverages[index] }));

            setCompleteAlbums(albumsWithAverages);
            setLoading(false);
        }

        fetchCompleteAlbums();
    }, [albums]);

    return loading ? (
        <Loading />
    ) : (
            <div className="artist-page-content col-lg-8">
                <h1 className="discography-title"><FormattedMessage id="discography" /></h1>
                <h2 className="discography-section-title"><FormattedMessage id="albums" /></h2>
                <DiscographySection albums={completeAlbums} />
            </div>
        );
};

const Loading = () => (
    <div className="bg-white col-lg-8 w-100 pt-4 d-flex justify-content-center">
        <div className="spinner spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

const filterMaxPopularity = (albums: AlbumWithRating[]): AlbumWithRating[] =>
    Object.values(
        albums.reduce((prev, curr) => {
            const accum = prev;
            accum[curr.name] =
                accum[curr.name] &&
                    accum[curr.name].popularity > curr.popularity
                    ? accum[curr.name]
                    : curr;
            return accum;
        }, {})
    );

const DiscographySection = ({ albums }: { albums: AlbumWithRating[] }) => {
    const { push } = useHistory();
    const filteredAlbums = filterMaxPopularity(albums)
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        .slice(0, 10);

    return (
        <table className="table discography-section-table">
            <tbody>
                {filteredAlbums.map(album => (
                    <tr
                        key={album.id}
                        className="clickable p-2"
                        onClick={() => push(`/album/${album.id}/`)}>
                        <td className="discography-section-table-data">
                            <img
                                className="artist-discography-album-cover"
                                src={album.imageUrl}
                                alt={album.name}
                            />
                        </td>
                        <td className="p-2">
                            <span className="discography-section-album-name">
                                {album.name}
                            </span>
                            <br />
                            <span className="discography-section-album-details">
                                <FormattedMessage id="tracks-in-album" values={{ trackCount: album.totalTracks }} />
                                {' • '}
                                {album.releaseYear}
                            </span>
                        </td>
                        <td className="discography-section-table-data text-center">
                            <FormattedMessage id="average-rating" />
                        <br />
                            {album.average > 0 ? <Rating initialValue={album.average} displayOnly /> : <i><FormattedMessage id="not-rated-yet" /></i>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ArtistPageContent;
