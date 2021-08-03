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
}

export type AlbumReview = {
  __typename?: 'AlbumReview'
  id: Scalars['ID']
  albumId: Scalars['ID']
  rating: Scalars['Int']
  author: Reviewer
  content: Scalars['String']
}

export type AlbumReviewInput = {
  content?: Maybe<Scalars['String']>
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
}

export type MutationReviewAlbumArgs = {
  albumId: Scalars['ID']
  review: AlbumReviewInput
}

export type Query = {
  __typename?: 'Query'
  search: SearchResult
}

export type QuerySearchArgs = {
  q: Scalars['String']
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type Reviewer = {
  __typename?: 'Reviewer'
  id: Scalars['ID']
  displayName: Scalars['String']
}

export type SearchResult = {
  __typename?: 'SearchResult'
  albums: Array<AlbumSearchResult>
  tracks: Array<TrackSearchResult>
  artists: Array<ArtistSearchResult>
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
