import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next'
import type { FC } from 'react'

import spotify from '@/node/lib/spotify'

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

  return { props: { trackInfo } }
}

const TrackPage: FC = () => {
  return <></>
}

export default TrackPage
