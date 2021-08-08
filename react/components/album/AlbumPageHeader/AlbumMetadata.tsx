import type { FC } from 'react'
import { defineMessages, FormattedDate, FormattedMessage } from 'react-intl'
import type { Album } from 'spotify-web-sdk'
import type { ThemeUIStyleObject } from 'theme-ui'
import { Flex, Text } from 'theme-ui'

import Link from '@/components/common/Link'
import Skeleton from '@/components/common/Skeleton'

const messages = defineMessages({
  byArtists: { id: 'musicritic.album-page.by-artists' },
  releaseDate: { id: 'musicritic.album-page.release-date' },
  openOnSpotify: { id: 'musicritic.album-page.open-on-spotify' },
})

const spotifyButtonStyles: ThemeUIStyleObject = {
  border: '1px solid',
  borderColor: 'muted.5',
  borderRadius: 8,
  paddingX: 3,
  paddingY: 2,
  width: 'fit-content',
  textDecoration: 'none',
  color: 'black',
}

interface Props {
  album: Album
  loading: boolean
}

const AlbumMetadata: FC<Props> = ({ album, loading }) => {
  const releaseDate = (
    <FormattedDate
      value={album?.releaseDate}
      day="numeric"
      month="long"
      year="numeric"
    />
  )

  const artists = album?.artists.map((artist) => (
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
        <Skeleton loading={loading} sx={{ height: 56, width: 400 }}>
          <>{album?.name}</>
        </Skeleton>
      </Text>
      <Text sx={{ fontSize: [2, 3, 4], marginBottom: 2 }}>
        <Skeleton loading={loading} sx={{ height: 28, width: 250 }}>
          <FormattedMessage {...messages.byArtists} values={{ artists }} />
        </Skeleton>
      </Text>
      <Text sx={{ fontSize: [1, 1, 2], marginBottom: 3 }}>
        <Skeleton loading={loading} sx={{ height: 18, width: 120 }}>
          <FormattedMessage
            {...messages.releaseDate}
            values={{ date: releaseDate }}
          />
        </Skeleton>
      </Text>
      <Skeleton loading={loading} sx={{ height: 36, width: 132 }}>
        <Link href={album?.externalUrls.spotify ?? ''} sx={spotifyButtonStyles}>
          <FormattedMessage {...messages.openOnSpotify} />
        </Link>
      </Skeleton>
    </Flex>
  )
}

export default AlbumMetadata
