import type { FC } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import type { Album } from 'spotify-web-sdk'
import { Box, Flex, Link, Text } from 'theme-ui'

const messages = defineMessages({
  linkTrackPage: { id: 'musicritic.album-page.link-track-page' },
  tracklist: { id: 'musicritic.album-page.tracklist' },
})

interface Props {
  album: Album
}

const AlbumTracklist: FC<Props> = ({ album }) => (
  <Box>
    <Text variant="sectionHeader">
      <FormattedMessage {...messages.tracklist} />
    </Text>
    <Flex sx={{ flexDirection: 'column' }}>
      {album.tracks.items.map((track) => (
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
    </Flex>
  </Box>
)

export default AlbumTracklist
