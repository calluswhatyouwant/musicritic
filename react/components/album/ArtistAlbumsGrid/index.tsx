import React from 'react'
import type { FC } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Grid, Text, Box } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'
import type { Album } from 'spotify-web-sdk'

import AlbumCard from './AlbumCard'

const titleStyles: ThemeUIStyleObject = {
  fontWeight: 'bold',
  fontSize: 4,
  marginBottom: 2,
  display: 'block',
}

const messages = defineMessages({
  otherAlbumsBy: { id: 'musicritic.album-page.other-albums-by' },
})

interface Props {
  albums: Album[]
  mainArtist?: string
}

const ArtistAlbumGrid: FC<Props> = ({ albums, mainArtist = 'Bleachers' }) => (
  <Box>
    <Text sx={titleStyles}>
      <FormattedMessage
        {...messages.otherAlbumsBy}
        values={{ artist: mainArtist }}
      />
    </Text>
    <Grid gap={2} columns={[1, 1, 1, 1, 1, 2]}>
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </Grid>
  </Box>
)

export default ArtistAlbumGrid
