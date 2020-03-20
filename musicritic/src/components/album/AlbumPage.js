/* @flow */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { getAlbum, getArtistAlbums } from '../../api/SpotifyWebAPI';

import AlbumSummary from './summary/AlbumSummary';
import AlbumPageContent from './content/AlbumPageContent';
import { usePromise } from '../../utils/hooks';

import './AlbumPage.css';

const wrapComponent = (SomeComponent, props) => (
    <section className="album-page-section col-lg-6">
        <SomeComponent {...props} />
    </section>
);

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
            {wrapComponent(AlbumSummary, {
                album,
                artistAlbums,
                mainArtist,
            })}
            {wrapComponent(AlbumPageContent, { album })}
        </div>
    );
}

export default AlbumPage;
