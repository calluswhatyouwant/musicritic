import type { FC } from 'react'
import { defineMessages, FormattedDate, FormattedMessage } from 'react-intl'
import type { Album } from 'spotify-web-sdk'
import { Flex, Text } from 'theme-ui'

import Link from '@/components/common/Link'

import AlbumActionsMenu from './AlbumActionsMenu'

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
      href={`/artists/${artist.id}`}
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
    <Flex sx={{ flexDirection: 'column' }}>
      <Text sx={{ fontSize: [3, 5, 6], fontWeight: 'bold', marginBottom: 1 }}>
        {album.name}
      </Text>
      <Text sx={{ fontSize: [2, 3, 4], marginBottom: 2 }}>
        <FormattedMessage {...messages.byArtists} values={{ artists }} />
      </Text>
      <Text sx={{ fontSize: [1, 1, 2], marginBottom: 3 }}>
        <FormattedMessage
          {...messages.releaseDate}
          values={{ date: releaseDate }}
        />
      </Text>
      <AlbumActionsMenu album={album} />
    </Flex>
  )
}

export default AlbumMetadata
