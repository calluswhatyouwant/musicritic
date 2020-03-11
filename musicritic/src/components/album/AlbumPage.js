/* @flow */

import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { getAlbum, getArtistAlbums } from '../../api/SpotifyWebAPI';

import AlbumSummary from './summary/AlbumSummary';
import AlbumPageContent from './content/AlbumPageContent';

import './AlbumPage.css';

const wrapComponent = (SomeComponent, props) => (
    <section className="album-page-section col-lg-6">
        <SomeComponent {...props} />
    </section>
);

function AlbumPage(props) {
    const [album, setAlbum] = useState({});
    const [artistAlbums, setArtistsAlbum] = useState([]);
    const [mainArtist, setMainArtist] = useState({});

    useEffect(() => {
        updateAlbumData(props.match.params.id);
    }, []);

    async function updateAlbumData(id) {
        try {
            const album = await getAlbum(id);
            const mainArtist = album.artists[0];

            setAlbum(album);
            setMainArtist(mainArtist);

            const artistAlbums = await getArtistAlbums(mainArtist.id, [
                'album',
            ]);

            setArtistsAlbum(_.uniqBy(artistAlbums.items, 'name'));
        } catch (error) {
            // Handle error on getAlbum or getArtistAlbums
            console.log(error);
        }
    }

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
