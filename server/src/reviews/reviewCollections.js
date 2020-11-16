/* @flow */

import { db, auth } from '../firebase/firebaseAdmin';

type ReviewModel = {
    id: string | null,
    authorUid: string,
    contentId: string,
    rating: number,
    review?: {
        createdAt: Date,
        updatedAt: Date,
        content: string,
    },
    contentType: 'track' | 'album',
};

export const Reviews = {
    track: db.collection('track-reviews'),
    album: db.collection('album-reviews'),
};

export const createReview = async (review: ReviewModel) => {
    const addedReviews = (
        await getUserReview(
            review.contentId,
            review.authorUid,
            review.contentType
        )
    ).docs.map(review => review.data());

    if (addedReviews.length > 0) {
        return await updateUserReview(addedReviews[0].id, review);
    }

    const ref = Reviews[review.contentType].doc();
    review.id = ref.id;
    await ref.set(review);
    return review;
};

export const getUserReview = (
    contentId: string,
    authorUid: string,
    contentType: 'track' | 'album',
) => {
    return Reviews[contentType]
        .where('authorUid', '==', authorUid)
        .where('contentId', '==', contentId)
        .get();
};

export const getReviews = async (contentId: string, contentType: string) => {
    const reviews = await Reviews[contentType]
        .where('contentId', '==', contentId)
        .get();
    return getReviewersInformation(reviews);
};

const getReviewersInformation = async reviews => {
    const usersIds = reviews.docs.map(review => ({
        uid: review.data().authorUid,
    }));
    const { users } = await auth.getUsers(usersIds);

    const reviewsData = reviews.docs.map(review => review.data());
    return reviewsData.map((review, i) => ({
        ...review,
        review: review.review && {
            createdAt: review.review.createdAt.toDate(),
            updatedAt: review.review.updatedAt.toDate(),
            content: review.review.content,
        },
        author: {
            displayName: users[i].displayName,
            avatarUrl: users[i].photoURL,
            authorUid: users[i].uid,
        },
    }));
};

export const updateUserReview = async (
    reviewId: string,
    updatedReview: ReviewModel
) => {
    updatedReview.id = reviewId;
    const ref = Reviews[updatedReview.contentType].doc(reviewId);
    const review = (await ref.get()).data();
    if (!review)
        throw {
            status: 500,
            message: 'Review not found',
        };

    if (updatedReview.authorUid !== review.authorUid)
        throw {
            status: 500,
            message: 'Not authorized to edit review from others',
        };

    if (updatedReview.contentId !== review.contentId)
        throw {
            status: 500,
            message: `Cannot change the ${updatedReview.contentType} which is being reviewed`,
        };

    if (updatedReview.review) {
        if (review.review) {
            updatedReview.review.createdAt = review.review.createdAt;
            updatedReview.review.content = updatedReview.review.content || review.review.content;
        }

        updatedReview.review.updatedAt = new Date();
    }

    ref.set(updatedReview);
    return updatedReview;
};
