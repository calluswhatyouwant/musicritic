/* @flow */
import express from 'express';
import { spotifySdk } from '../spotify/util';

import { ALBUM } from '../reviews/albumReviewController';
import { getReviews } from '../reviews/reviewCollections';
import { objectToJson } from '../util';

const router = express.Router();

router.get('/albums/:id', async (req, res) => {
    const albumId = req.params.id;

    const album = await spotifySdk.getAlbum(albumId);
    const albumReviews = await getReviews(albumId, ALBUM);

    const albumRatings = albumReviews.map(review => review.rating);
    const averageRating =
        albumRatings.length > 0
            ? albumRatings.reduce((x, y) => x + y) / albumRatings.length
            : 0;

    res.status(200).send({
        album: JSON.parse(objectToJson(album)),
        averageRating
    });
});

router.get('/albums/:ids/data', async (req, res) => {
    const albumIds = req.params.ids.split(',');
    const albums = await spotifySdk.getSeveralAlbums(albumIds);

    res.status(200).send({
        albums: albums.map(a => JSON.parse(objectToJson(a))),
    });
});

export default router;
