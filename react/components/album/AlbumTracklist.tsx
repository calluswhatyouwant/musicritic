import React from 'react'
import type { FC } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import type { Album } from 'spotify-web-sdk'
import { Box, Flex, Text } from 'theme-ui'

const messages = defineMessages({
  linkTrackPage: { id: 'musicritic.album-page.link-track-page' },
  tracklist: { id: 'musicritic.album-page.tracklist' },
})

interface Props {
  album: Album
}

const AlbumTracklist: FC<Props> = ({ album }) => (
  <Box>
    <Text
      sx={{
        fontWeight: 'bold',
        fontSize: 4,
        marginBottom: 2,
        display: 'block',
      }}
    >
      <FormattedMessage {...messages.tracklist} />
    </Text>
    <Flex sx={{ flexDirection: 'column', gap: '2px' }}>
      {album.tracks.items.map((track) => (
        <Flex
          key={track.id}
          sx={{
            borderRadius: 2,
            padding: 2,
            border: '1px solid black',
            justifyContent: 'space-between',
            alignItems: 'center',
            ':hover': {
              cursor: 'pointer',
              backgroundColor: '#DEDEDE',
              span: {
                display: 'block',
              },
            },
          }}
        >
          <Text>
            {track.trackNumber}. {track.name}
          </Text>
          <Text
            sx={{
              display: 'none',
              fontSize: 0,
              color: 'gray',
            }}
          >
            <FormattedMessage {...messages.linkTrackPage} />
          </Text>
        </Flex>
      ))}
    </Flex>
  </Box>
)

export default AlbumTracklist
