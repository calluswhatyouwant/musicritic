/* @flow */
import express from 'express';
import { spotifySdk } from '../spotify/util';

import { TRACK } from '../reviews/trackReviewController';
import { getReviews } from '../reviews/reviewCollections';
import { objectToJson } from '../util';

const router = express.Router();

router.get('/tracks/:id', async (req, res) => {
    const trackId = req.params.id;

    const track = await spotifySdk.getTrack(trackId);
    const trackReviews = await getReviews(TRACK, trackId);

    const trackRatings = trackReviews.map(review => review.rating);
    const averageRating =
        trackRatings.length > 0
            ? trackRatings.reduce((x, y) => x + y) / trackRatings.length
            : 0;

    res.status(200).send({
        track: JSON.parse(objectToJson(track)),
        averageRating
    });
});

export default router;
