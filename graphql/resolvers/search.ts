import type { AlbumSimplified, Track } from 'spotify-web-sdk'

import type { QuerySearchArgs } from '@/types/graphql-schemas'

import type { Context } from '../context'

export const Query = {
  search: async (_: unknown, { q }: QuerySearchArgs, context: Context) => {
    const result = await context.spotify.search(q, 'album,track,artist', {
      limit: 50,
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
