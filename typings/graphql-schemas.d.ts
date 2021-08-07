export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
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
  images: Array<Image>
  releaseYear: Scalars['String']
  artists: Scalars['String']
}

export type ArtistSearchResult = {
  __typename?: 'ArtistSearchResult'
  id: Scalars['ID']
  name: Scalars['String']
  images: Array<Image>
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
  albumReviews: Array<AlbumReview>
  trackReviews: Array<TrackReview>
}

export type QuerySearchArgs = {
  q: Scalars['String']
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryAlbumReviewsArgs = {
  albumId: Scalars['ID']
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderBy?: Maybe<OrderBy>
  direction?: Maybe<OrderDirection>
}

export type QueryTrackReviewsArgs = {
  trackId: Scalars['ID']
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
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
  albums: Array<AlbumSearchResult>
  tracks: Array<TrackSearchResult>
  artists: Array<ArtistSearchResult>
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
  images: Array<Image>
  album: Scalars['String']
  artists: Scalars['String']
  releaseYear: Scalars['String']
}
