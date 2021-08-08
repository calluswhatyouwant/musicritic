import type { FC } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Grid, Text, Box } from 'theme-ui'
import type { AlbumSimplified } from 'spotify-web-sdk'

import Skeleton from '@/components/common/Skeleton'

import AlbumCard from './AlbumCard'

const messages = defineMessages({
  otherAlbumsBy: { id: 'musicritic.album-page.other-albums-by' },
})

interface Props {
  albums: AlbumSimplified[]
  mainArtist: string
  loading: boolean
}

const ArtistAlbumGrid: FC<Props> = ({ albums, mainArtist, loading }) => (
  <Box>
    <Text variant="sectionHeader">
      <Skeleton loading={loading} sx={{ height: 36, width: '95%' }}>
        <FormattedMessage
          {...messages.otherAlbumsBy}
          values={{ artist: mainArtist }}
        />
      </Skeleton>
    </Text>
    <Grid gap={2} columns={[1, 1, 1, 1, 1, 2]}>
      <Skeleton sx={{ height: 64 }} loading={loading} count={4}>
        {albums?.map((album) => (
          <AlbumCard key={album?.id} album={album} />
        ))}
      </Skeleton>
    </Grid>
  </Box>
)

export default ArtistAlbumGrid
