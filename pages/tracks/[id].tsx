import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next'
import type { FC } from 'react'
import type { Track } from 'spotify-web-sdk'
import { useRouter } from 'next/router'

import spotify from '@/node/lib/spotify'
import PageHeader from '@/components/common/PageHeader'
import TrackMetadata from '@/components/track/TrackMetadata'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const trackId = (context.params?.id as string) ?? ''
  const trackInfo = await spotify.getTrack(trackId)

  return {
    props: { trackInfo: JSON.parse(JSON.stringify(trackInfo.toJSON())) },
  }
}

interface Props {
  trackInfo: Track
}

const TrackPage: FC<Props> = ({ trackInfo }) => {
  const router = useRouter()
  const isLoading = router.isFallback

  return (
    <PageHeader
      imgURL={trackInfo.album?.imageUrl}
      imgALT={trackInfo.albumName}
      rating={10}
      loading={isLoading}
    >
      <TrackMetadata
        name="Nome"
        artist={trackInfo.mainArtists[0].name}
        album={trackInfo.albumName}
        length={trackInfo.length}
        releaseDate={trackInfo.album.releaseDate}
        spotifyURL={trackInfo.uri}
      />
    </PageHeader>
  )
}

export default TrackPage
