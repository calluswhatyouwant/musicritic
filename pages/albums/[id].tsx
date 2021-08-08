import type { Album, AlbumSimplified } from 'spotify-web-sdk'
import { Flex, Grid, Spinner } from 'theme-ui'
import Head from 'next/head'
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next'
import type { FC } from 'react'
import { useRouter } from 'next/dist/client/router'

import AlbumPageHeader from '@/components/album/AlbumPageHeader'
import AlbumTracklist from '@/components/album/AlbumTracklist'
import ArtistAlbumsGrid from '@/components/album/ArtistAlbumsGrid'
import AlbumReviewSection from '@/components/album/AlbumReviewSection/index'
import spotify from '@/graphql/clients/spotify'

import { reviewMocks } from './mock'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const albumId = (context.params?.id as string) ?? ''
  const album = await spotify.getAlbum(albumId).catch(() => null)

  if (!album) {
    return {
      notFound: true,
    }
  }

  const artistAlbums = (
    await spotify.getArtistAlbums(album.artists[0].id, {
      includeGroups: ['album'],
      market: 'BR',
    })
  ).items

  const dedupAlbums = artistAlbums.filter(
    (a1, index) => artistAlbums.findIndex((a2) => a2.name === a1.name) === index
  )

  return {
    props: {
      album: JSON.parse(JSON.stringify(album.toJSON())),
      artistAlbums: dedupAlbums.map((artistAlbum) =>
        JSON.parse(JSON.stringify(artistAlbum.toJSON()))
      ),
    },
  }
}

interface Props {
  album: Album
  artistAlbums: AlbumSimplified[]
}

const AlbumPage: FC<Props> = ({ album, artistAlbums }) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Flex
        sx={{
          width: '100%',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spinner size={256} />
      </Flex>
    )
  }

  const pageTitle = `${album.name} - ${album.stringArtists} | Musicritic`

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <AlbumPageHeader album={album} />
      <Grid
        gap={4}
        columns={[1, 2, '2fr 3fr']}
        sx={{
          paddingX: [6, 8, 6, 8, 16],
          paddingY: [6, 8, 6, 8],
        }}
      >
        <Grid sx={{ flexDirection: 'column', height: 'fit-content', gap: 6 }}>
          <AlbumTracklist album={album} />
          <ArtistAlbumsGrid
            albums={artistAlbums}
            mainArtist={album.artists[0].name}
          />
        </Grid>
        <AlbumReviewSection reviews={reviewMocks} />
      </Grid>
    </Flex>
  )
}

export default AlbumPage
