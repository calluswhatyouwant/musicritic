import React from 'react'
import type { FC } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import type { Album } from 'spotify-web-sdk'
import { Flex, Link } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

const spotifyButtonStyles: ThemeUIStyleObject = {
  border: '1px solid black',
  borderRadius: 32,
  paddingX: 3,
  paddingY: 2,
  width: 'fit-content',
  textDecoration: 'none',
  color: 'black',
}

const messages = defineMessages({
  openOnSpotify: { id: 'musicritic.album-page.open-on-spotify' },
})

interface Props {
  album: Album
}

const AlbumActionsMenu: FC<Props> = ({ album }) => (
  <Flex
    sx={{
      width: '100%',
      justifyContent: ['center', 'center', 'flex-start'],
    }}
  >
    <Link href={album.externalUrls.spotify} sx={spotifyButtonStyles}>
      <FormattedMessage {...messages.openOnSpotify} />
    </Link>
  </Flex>
)

export default AlbumActionsMenu
