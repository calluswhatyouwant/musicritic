import type { FC } from 'react'
import { defineMessages, FormattedDate, FormattedMessage } from 'react-intl'
import type { Album } from 'spotify-web-sdk'
import { Flex, Grid, Image, Link, Text } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

import AlbumActionsMenu from './AlbumActionsMenu'
import AlbumRatingBadge from './AlbumRatingBadge'

const imageContainerStyles: ThemeUIStyleObject = {
  alignItems: 'center',
  justifyContent: 'center',
}

const detailsContainerStyles: ThemeUIStyleObject = {
  padding: [0, 0, 4],
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: ['center', 'center', 'left'],
}

const messages = defineMessages({
  byArtists: { id: 'musicritic.album-page.by-artists' },
  releaseDate: { id: 'musicritic.album-page.release-date' },
})

interface Props {
  album: Album
}

const AlbumMetadata: FC<Props> = ({ album }) => {
  const releaseDate = (
    <FormattedDate
      value={album.releaseDate}
      day="numeric"
      month="long"
      year="numeric"
    />
  )

  const artists = album.artists.map((artist) => (
    <Link
      key={artist.id}
      href="/artist"
      sx={{
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black',
      }}
    >
      {artist.name}
    </Link>
  ))

  return (
    <Grid
      columns={[1, 1, '2fr 3fr 1fr']}
      sx={{
        backgroundColor: '#DEDEDE',
        width: '100%',
        paddingX: [3, 4, 4, 4, 5, 7],
        paddingY: [3, 3, 4, 4],
      }}
    >
      <Flex sx={imageContainerStyles}>
        <Image
          alt={album.name}
          src={album.imageUrl}
          sx={{ maxHeight: 280, maxWidth: 280 }}
        />
      </Flex>
      <Flex sx={detailsContainerStyles}>
        <Text sx={{ fontSize: 5, fontWeight: 'bold', marginBottom: 2 }}>
          {album.name}
        </Text>
        <Text sx={{ fontSize: 3, marginBottom: 3 }}>
          <FormattedMessage {...messages.byArtists} values={{ artists }} />
        </Text>
        <Text sx={{ fontSize: 2, marginBottom: 2 }}>
          <FormattedMessage
            {...messages.releaseDate}
            values={{ date: releaseDate }}
          />
        </Text>
        <AlbumActionsMenu album={album} />
      </Flex>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AlbumRatingBadge rating={4.9} />
      </Flex>
    </Grid>
  )
}

export default AlbumMetadata
