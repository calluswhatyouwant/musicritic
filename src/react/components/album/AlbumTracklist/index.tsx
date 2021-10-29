import type { FC } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import type { Page, TrackSimplified } from 'spotify-web-sdk'
import { Box, Flex, Heading } from 'theme-ui'

import Skeleton from '../../common/Skeleton'
import AlbumTrack from './AlbumTrack'

const messages = defineMessages({
  linkTrackPage: { id: 'musicritic.album-page.link-track-page' },
  tracklist: { id: 'musicritic.album-page.tracklist' },
})

interface Props {
  loading: boolean
  albumTracks?: TrackSimplified[]
}

const AlbumTracklist: FC<Props> = ({
  albumTracks = [...Array(10)],
  loading,
}) => (
  <Box>
    <Heading as="h3" variant="section">
      <Skeleton loading={loading} variant="text.section" width={128}>
        <FormattedMessage {...messages.tracklist} />
      </Skeleton>
    </Heading>
    <Flex sx={{ flexDirection: 'column' }}>
      {albumTracks.map((track, index) => (
        <AlbumTrack key={index} track={track} loading={loading} />
      ))}
    </Flex>
  </Box>
)

export default AlbumTracklist
