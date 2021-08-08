import type { FC } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Grid, Text, Box } from 'theme-ui'
import type { AlbumSimplified } from 'spotify-web-sdk'

import AlbumCard from './AlbumCard'

const messages = defineMessages({
  otherAlbumsBy: { id: 'musicritic.album-page.other-albums-by' },
})

interface Props {
  albums: AlbumSimplified[]
  mainArtist: string
}

const ArtistAlbumGrid: FC<Props> = ({ albums, mainArtist }) => (
  <Box>
    <Text variant="sectionHeader">
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
