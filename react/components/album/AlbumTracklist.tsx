import type { FC } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import type { Album } from 'spotify-web-sdk'
import { Box, Flex, Text } from 'theme-ui'

import Link from '../common/Link'
import Skeleton from '../common/Skeleton'

const messages = defineMessages({
  linkTrackPage: { id: 'musicritic.album-page.link-track-page' },
  tracklist: { id: 'musicritic.album-page.tracklist' },
})

interface Props {
  album: Album
  loading: boolean
}

const AlbumTracklist: FC<Props> = ({ album, loading }) => (
  <Box>
    <Text variant="sectionHeader">
      <Skeleton loading={loading} sx={{ height: 36, width: '50%' }}>
        <FormattedMessage {...messages.tracklist} />
      </Skeleton>
    </Text>
    <Flex sx={{ flexDirection: 'column' }}>
      <Skeleton
        sx={{ height: 42, marginBottom: '1px' }}
        loading={loading}
        count={10}
      >
        {album?.tracks.items.map((track) => (
          <Link
            key={track.id}
            href={`/tracks/${track.id}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              borderTop: '1px solid',
              borderColor: 'muted.1',
              ':last-of-type': {
                borderBottom: '1px solid',
                borderColor: 'muted.1',
              },
            }}
          >
            <Flex
              sx={{
                padding: 3,
                alignItems: 'center',
                ':hover': {
                  cursor: 'pointer',
                  backgroundColor: 'muted.0',
                },
              }}
            >
              <Text sx={{ minWidth: '2rem', color: 'muted.3' }}>
                {track.trackNumber}
              </Text>
              <Text>{track.name}</Text>
            </Flex>
          </Link>
        ))}
      </Skeleton>
    </Flex>
  </Box>
)

export default AlbumTracklist
