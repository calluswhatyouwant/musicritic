import type { Album } from 'spotify-web-sdk'
import { Flex, Grid } from 'theme-ui'
import Head from 'next/head'
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next'
import type { FC } from 'react'
import { useRouter } from 'next/dist/client/router'

import AlbumMetadata from '@/components/album/AlbumMetadata'
import AlbumTracklist from '@/components/album/AlbumTracklist'
import ArtistAlbumsGrid from '@/components/album/ArtistAlbumsGrid'
import AlbumReviewSection from '@/components/album/AlbumReviewSection/index'
import spotify from '@/graphql/clients/spotify'

import { reviewMock } from './mock'

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
  const album = (await spotify.getAlbum(albumId).catch(() => null))?.toJSON()

  if (!album) {
    return {
      notFound: true,
    }
  }

  return {
    props: { album: JSON.parse(JSON.stringify(album)) },
  }
}

interface Props {
  album: Album
}

const AlbumPage: FC<Props> = ({ album }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <>Loading...</>
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
      <AlbumMetadata album={album} />
      <Grid
        gap={4}
        columns={[1, 2, '2fr 3fr']}
        sx={{ paddingX: [3, 4, 4, 4, 5, 7], paddingY: [3, 3, 4, 4] }}
      >
        <Grid sx={{ flexDirection: 'column', height: 'fit-content' }}>
          <AlbumTracklist album={album} />
          <ArtistAlbumsGrid albums={[album, album, album, album]} />
        </Grid>
        <AlbumReviewSection reviews={[reviewMock, reviewMock, reviewMock]} />
      </Grid>
    </Flex>
  )
}

export default AlbumPage
