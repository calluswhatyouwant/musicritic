import type { FC } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Grid, Box, Heading } from 'theme-ui'
import type { AlbumSimplified } from 'spotify-web-sdk'

import Skeleton from 'src/react/components/common/Skeleton'

import AlbumCard from './AlbumCard'

const messages = defineMessages({
  otherAlbumsBy: { id: 'musicritic.album-page.other-albums-by' },
})

interface Props {
  albums?: AlbumSimplified[]
  mainArtist: string
  loading: boolean
}

const ArtistAlbumGrid: FC<Props> = ({
  albums = [...Array(4)],
  mainArtist,
  loading,
}) => (
  <Box>
    <Heading as="h3" variant="section">
      <Skeleton loading={loading} variant="text.section" width={256}>
        <FormattedMessage
          {...messages.otherAlbumsBy}
          values={{ artist: mainArtist }}
        />
      </Skeleton>
    </Heading>
    <Grid gap={2} columns={[1, 1, 1, 1, 1, 2]}>
      {albums.map((album, index) => (
        <AlbumCard key={album?.id ?? index} album={album} loading={loading} />
      ))}
    </Grid>
  </Box>
)

export default ArtistAlbumGrid
