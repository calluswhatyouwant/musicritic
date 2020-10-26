/* @flow */

import { db } from '../firebase/firebaseAdmin';

type TrackReviewModel = {
    id: string | null,
    authorUid: string,
    trackId: string,
    rating: number,
    review: string | null,
};

export const TrackReviews = db.collection('track-reviews');

export const createTrackReview = async (review: TrackReviewModel) => {
    const addedTrackReviews = await getUserTrackReview(
        review.trackId,
        review.authorUid
    );
    if (addedTrackReviews.size > 0) {
        throw {
            status: 500,
            message: 'Track already reviewed by the user',
        };
    }
    const ref = TrackReviews.doc();
    review.id = ref.id;
    await ref.set(review);
    return review;
};

export const getUserTrackReview = (trackId: string, authorUid: string) => {
    return TrackReviews.where('authorUid', '==', authorUid)
        .where('trackId', '==', trackId)
        .get();
};
