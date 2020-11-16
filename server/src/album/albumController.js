/* @flow */
import express from 'express';
import { spotifySdk } from '../spotify/util';

import { ALBUM } from '../reviews/albumReviewController';
import { getReviews } from '../reviews/reviewCollections';

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

    res.status(200).send({ album, averageRating });
});

export default router;
