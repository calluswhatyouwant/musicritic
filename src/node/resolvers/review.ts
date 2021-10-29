import type {
  MutationReviewAlbumArgs,
  MutationReviewTrackArgs,
  QueryAlbumReviewsArgs,
  QueryTrackReviewsArgs,
} from 'src/typings/graphql-schemas'

import type { ReviewModel } from '../business/reviews'
import {
  getTrackReviews,
  getAlbumReviews,
  upsertAlbumReview,
  upsertTrackReview,
} from '../business/reviews'
import { protectedResolver } from './util'
import type { Context } from '../context'
import { getUserById } from '../business/users'

export const Query = {
  albumReviews: async (
    _: unknown,
    { albumId, orderBy, direction }: QueryAlbumReviewsArgs,
    { firestore: { reviews } }: Context
  ) =>
    (
      await getAlbumReviews(
        albumId,
        orderBy ?? 'recent',
        direction ?? 'desc',
        reviews
      )
    ).docs.map((review) => review.data()),
  trackReviews: async (
    _: unknown,
    { trackId, orderBy, direction }: QueryTrackReviewsArgs,
    { firestore: { reviews } }: Context
  ) =>
    (
      await getTrackReviews(
        trackId,
        orderBy ?? 'recent',
        direction ?? 'desc',
        reviews
      )
    ).docs.map((review) => review.data()),
}

export const Mutation = {
  reviewAlbum: protectedResolver<unknown, MutationReviewAlbumArgs>(
    (_, { albumId, review }, { firestore, auth }) => {
      const userId = auth?.user.id ?? ''

      return upsertAlbumReview(albumId, userId, review, firestore.reviews)
    }
  ),
  reviewTrack: protectedResolver<unknown, MutationReviewTrackArgs>(
    (_, { trackId, review }, { firestore, auth }) => {
      const userId = auth?.user.id ?? ''

      return upsertTrackReview(trackId, userId, review, firestore.reviews)
    }
  ),
}

export const Types = {
  AlbumReview: {
    albumId: (parent: ReviewModel) => parent.contentId,
    author: async (
      parent: ReviewModel,
      __: unknown,
      { firestore: { users } }: Context
    ) => ({
      ...(await getUserById(parent.author, users)).data(),
      id: parent.author,
    }),
  },
  TrackReview: {
    trackId: (parent: ReviewModel) => parent.contentId,
    author: async (
      parent: ReviewModel,
      __: unknown,
      { firestore: { users } }: Context
    ) => ({
      ...(await getUserById(parent.author, users)).data(),
      id: parent.author,
    }),
  },
}
