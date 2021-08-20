import type { firestore } from 'firebase-admin'

import type {
  OrderBy,
  OrderDirection,
  ReviewInput,
} from '@/types/graphql-schemas'

import type { collections } from '../lib/firebase-admin'
import admin from '../lib/firebase-admin'

export type ContentType = 'album' | 'track'

export interface ReviewModel {
  id: string
  post?: string | null
  edited: boolean
  rating: number
  author: string
  contentId: string
  contentType: ContentType
  createdAt: firestore.Timestamp
  updatedAt: firestore.Timestamp
}

const getReviewFromUser =
  (contentType: ContentType) =>
  (
    contentId: string,
    authorUid: string,
    reviewsCollection: typeof collections.reviews
  ) =>
    reviewsCollection
      .where('author', '==', authorUid)
      .where('contentId', '==', contentId)
      .where('contentType', '==', contentType)
      .get()

const getReviews =
  (contentType: ContentType) =>
  async (
    contentId: string,
    orderBy: OrderBy,
    direction: OrderDirection,
    reviewsCollection: typeof collections.reviews
  ) =>
    reviewsCollection
      .where('contentId', '==', contentId)
      .where('contentType', '==', contentType)
      .orderBy('post')
      .orderBy(orderBy === 'rating' ? 'rating' : 'createdAt', direction)
      .get()

export const getAlbumReviews = getReviews('album')
export const getTrackReviews = getReviews('track')

const createReview =
  (contentType: ContentType) =>
  async (
    contentId: string,
    userId: string,
    review: ReviewInput,
    reviewsCollection: typeof collections.reviews
  ) => {
    const newReviewRef = reviewsCollection.doc()

    const newReview = {
      contentType,
      id: newReviewRef.id,
      edited: false,
      contentId,
      ...review,
      author: userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }

    await newReviewRef.set(newReview)

    return {
      ...newReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

const updateReview = async (
  oldReview: ReviewModel,
  newReview: ReviewInput,
  reviewsCollection: typeof collections.reviews
) => {
  const reviewRef = reviewsCollection.doc(oldReview.id)

  if (!newReview.post && oldReview.post) {
    newReview.post = oldReview.post
  }

  const updatedReview = {
    ...oldReview,
    ...newReview,
    edited: true,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  }

  await reviewRef.set(updatedReview)

  return {
    ...updatedReview,
    updatedAt: new Date(),
  }
}

const upsertReview =
  (contentType: ContentType) =>
  async (
    contentId: string,
    userId: string,
    review: ReviewInput,
    reviewsCollection: typeof collections.reviews
  ) => {
    const oldReview = await getReviewFromUser(contentType)(
      contentId,
      userId,
      reviewsCollection
    )

    const newReview = oldReview.empty
      ? createReview(contentType)(contentId, userId, review, reviewsCollection)
      : updateReview(
          oldReview.docs[0]?.data() as ReviewModel,
          review,
          reviewsCollection
        )

    return newReview
  }

export const upsertAlbumReview = upsertReview('album')
export const upsertTrackReview = upsertReview('track')
