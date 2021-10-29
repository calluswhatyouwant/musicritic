import type { AlbumSimplified, Track } from 'spotify-web-sdk'

import type { QuerySearchArgs } from 'src/typings/graphql-schemas'

import type { Context } from '../context'

export const Query = {
  search: async (
    _: unknown,
    { q, limit, offset }: QuerySearchArgs,
    { spotify }: Context
  ) => {
    const result = await spotify.search(q, 'album,track,artist', {
      limit: limit ?? 50,
      offset: offset ?? 0,
    })

    return {
      albums: result.albums?.items ?? [],
      tracks: result.tracks?.items ?? [],
      artists: result.artists?.items ?? [],
    }
  },
}

export const Types = {
  AlbumSearchResult: {
    artists: (root: AlbumSimplified) => root.stringArtists,
  },
  TrackSearchResult: {
    album: (root: Track) => root.album.name,
    artists: (root: Track) => root.stringArtists,
  },
}
