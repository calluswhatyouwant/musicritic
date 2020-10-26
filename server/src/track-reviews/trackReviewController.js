/* @flow */

import express from 'express';
import { uniqueId } from 'lodash';
import checkAuth from '../firebase/firebaseAuthHandler';
import { createTrackReview } from './trackReviewCollections';

const router = express.Router();

router.post('/track/:id/reviews', checkAuth, (req, res) => {
    const review = req.body;
    review.trackId = req.params.id;
    review.authorUid = req.user.uid;
    createTrackReview(review)
        .then(review => res.status(201).send(review))
        .catch(error => res.status(error.status).send(error));
});

export default router;
