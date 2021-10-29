import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: Date
}

export type AlbumReview = Review & {
  __typename?: 'AlbumReview'
  albumId: Scalars['String']
  id: Scalars['ID']
  rating: Scalars['Int']
  author: Reviewer
  post?: Maybe<Scalars['String']>
  edited: Scalars['Boolean']
  createdAt: Scalars['Date']
  updatedAt: Scalars['Date']
}

export type AlbumReviewFilterInput = {
  post?: Maybe<Scalars['String']>
  rating: Scalars['Int']
}

export type AlbumSearchResult = {
  __typename?: 'AlbumSearchResult'
  id: Scalars['ID']
  name: Scalars['String']
  images: Image[]
  releaseYear: Scalars['String']
  artists: Scalars['String']
}

export type ArtistSearchResult = {
  __typename?: 'ArtistSearchResult'
  id: Scalars['ID']
  name: Scalars['String']
  images: Image[]
}

export type Image = {
  __typename?: 'Image'
  height: Scalars['Int']
  url: Scalars['String']
  width: Scalars['Int']
  isSquared: Scalars['Boolean']
}

export type Mutation = {
  __typename?: 'Mutation'
  reviewAlbum: AlbumReview
  reviewTrack: TrackReview
}

export type MutationReviewAlbumArgs = {
  albumId: Scalars['ID']
  review: ReviewInput
}

export type MutationReviewTrackArgs = {
  trackId: Scalars['ID']
  review: ReviewInput
}

export type OrderBy = 'recent' | 'rating'

export type OrderDirection = 'asc' | 'desc'

export type Query = {
  __typename?: 'Query'
  search: SearchResult
  albumReviews: AlbumReview[]
  trackReviews: TrackReview[]
}

export type QuerySearchArgs = {
  q: Scalars['String']
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAlbumReviewsArgs = {
  albumId: Scalars['ID']
  orderBy?: Maybe<OrderBy>
  direction?: Maybe<OrderDirection>
}

export type QueryTrackReviewsArgs = {
  trackId: Scalars['ID']
  orderBy?: Maybe<OrderBy>
  direction?: Maybe<OrderDirection>
}

export type Review = {
  id: Scalars['ID']
  rating: Scalars['Int']
  author: Reviewer
  post?: Maybe<Scalars['String']>
  edited: Scalars['Boolean']
  createdAt: Scalars['Date']
  updatedAt: Scalars['Date']
}

export type ReviewInput = {
  post?: Maybe<Scalars['String']>
  rating: Scalars['Int']
}

export type Reviewer = {
  __typename?: 'Reviewer'
  id: Scalars['ID']
  name: Scalars['String']
  image?: Maybe<Scalars['String']>
}

export type SearchResult = {
  __typename?: 'SearchResult'
  albums: AlbumSearchResult[]
  tracks: TrackSearchResult[]
  artists: ArtistSearchResult[]
}

export type TrackReview = Review & {
  __typename?: 'TrackReview'
  trackId: Scalars['String']
  id: Scalars['ID']
  rating: Scalars['Int']
  author: Reviewer
  post?: Maybe<Scalars['String']>
  edited: Scalars['Boolean']
  createdAt: Scalars['Date']
  updatedAt: Scalars['Date']
}

export type TrackSearchResult = {
  __typename?: 'TrackSearchResult'
  id: Scalars['ID']
  name: Scalars['String']
  images: Image[]
  album: Scalars['String']
  artists: Scalars['String']
  releaseYear: Scalars['String']
}

export type AlbumReviewsQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type AlbumReviewsQuery = { __typename?: 'Query' } & {
  albumReviews: Array<
    { __typename?: 'AlbumReview' } & Pick<
      AlbumReview,
      'id' | 'rating' | 'post' | 'createdAt' | 'updatedAt'
    > & {
        author: { __typename?: 'Reviewer' } & Pick<Reviewer, 'name' | 'image'>
      }
  >
}

export const AlbumReviewsDocument = gql`
  query AlbumReviews($id: ID!) {
    albumReviews(albumId: $id) {
      id
      rating
      post
      createdAt
      updatedAt
      author {
        name
        image
      }
    }
  }
`

/**
 * __useAlbumReviewsQuery__
 *
 * To run a query within a React component, call `useAlbumReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlbumReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlbumReviewsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAlbumReviewsQuery(
  baseOptions: Apollo.QueryHookOptions<
    AlbumReviewsQuery,
    AlbumReviewsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<AlbumReviewsQuery, AlbumReviewsQueryVariables>(
    AlbumReviewsDocument,
    options
  )
}

export function useAlbumReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AlbumReviewsQuery,
    AlbumReviewsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<AlbumReviewsQuery, AlbumReviewsQueryVariables>(
    AlbumReviewsDocument,
    options
  )
}

export type AlbumReviewsQueryHookResult = ReturnType<
  typeof useAlbumReviewsQuery
>
export type AlbumReviewsLazyQueryHookResult = ReturnType<
  typeof useAlbumReviewsLazyQuery
>
export type AlbumReviewsQueryResult = Apollo.QueryResult<
  AlbumReviewsQuery,
  AlbumReviewsQueryVariables
>
