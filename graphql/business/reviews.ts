import type { firestore } from 'firebase-admin'

import type { AlbumReviewInput } from '@/types/graphql-schemas'

import type { collections } from '../clients/firebase-admin'
import admin from '../clients/firebase-admin'

export interface AlbumReviewModel {
  id: string
  content?: string | null
  edited: boolean
  rating: number
  author: string
  albumId: string
  createdAt: firestore.Timestamp
  updatedAt: firestore.Timestamp
}

export const getAlbumReviewFromUser =
  (albumId: string, authorUid: string) =>
  (albumReviewsCollection: typeof collections.albumReviews) => {
    return albumReviewsCollection
      .where('author', '==', authorUid)
      .where('albumId', '==', albumId)
      .get()
  }

export const createAlbumReview =
  (albumId: string, userId: string, review: AlbumReviewInput) =>
  async (albumReviewsCollection: typeof collections.albumReviews) => {
    const newReviewRef = albumReviewsCollection.doc()

    const newReview = {
      id: newReviewRef.id,
      edited: false,
      albumId,
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

export const updateAlbumReview =
  (oldReview: AlbumReviewModel, newReview: AlbumReviewInput) =>
  async (albumReviewsCollection: typeof collections.albumReviews) => {
    const reviewRef = albumReviewsCollection.doc(oldReview.id)

    const updatedReview = {
      ...oldReview,
      edited: true,
      content: newReview.content ?? newReview.content,
      rating: newReview.rating ?? newReview.rating,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }

    await reviewRef.set(updatedReview)

    return {
      ...updatedReview,
      createdAt: oldReview.createdAt.toDate(),
      updatedAt: new Date(),
    }
  }
