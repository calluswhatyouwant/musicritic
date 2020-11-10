/* @flow */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { getAlbum, getArtistAlbums } from '../../api/SpotifyWebAPI';

import AlbumSummary from './summary/AlbumSummary';
import ReviewSection from '../review/ReviewSection';
import { usePromise } from '../../utils/hooks';

import './AlbumPage.css';

function AlbumPage() {
    const { id } = useParams();
    const [album] = usePromise(getAlbum(id), {}, [id]);
    const [mainArtist, setMainArtist] = useState({});
    const [artistAlbums] = usePromise(
        (async () => {
            if (mainArtist.id) {
                const artistAlbumsResponse = await getArtistAlbums(
                    mainArtist.id,
                    ['album']
                );
                return _.uniqBy(artistAlbumsResponse.items, 'name');
            }
            return [];
        })(),
        [],
        [mainArtist]
    );

    useEffect(() => {
        function setAlbumMainArtist() {
            if (album.artists) setMainArtist(album.artists[0]);
        }

        setAlbumMainArtist();
    }, [album]);

    return (
        <div className="row album-page border container shadow-sm">
            <section className="album-page-section col-lg-4">
                <AlbumSummary album={album} artistAlbums={artistAlbums} mainArtist={mainArtist} />
            </section>
            <section className="album-page-section col-lg-8">
                <ReviewSection redirectUrl={`/album/${id}/review`} reviews={[]} />
            </section>
        </div>
    );
}

export default AlbumPage;
