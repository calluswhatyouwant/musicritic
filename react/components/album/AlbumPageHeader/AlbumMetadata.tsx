import type { FC } from 'react'
import { defineMessages, FormattedDate, FormattedMessage } from 'react-intl'
import type { Album } from 'spotify-web-sdk'
import type { ThemeUIStyleObject } from 'theme-ui'
import { Heading, Flex, Text } from 'theme-ui'

import Link from '@/components/common/Link'
import Skeleton from '@/components/common/Skeleton'

const messages = defineMessages({
  byArtists: { id: 'musicritic.album-page.by-artists' },
  releaseDate: { id: 'musicritic.album-page.release-date' },
  openOnSpotify: { id: 'musicritic.album-page.open-on-spotify' },
})

const containerStyles: ThemeUIStyleObject = {
  flexDirection: 'column',
  width: '100%',
  alignItems: ['center', 'center', 'flex-start'],
}

interface Props {
  album?: Album
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
    <Link key={artist.id} href={`/artists/${artist.id}`} variant="plain-hover">
      {artist.name}
    </Link>
  ))

  return (
    <Flex sx={containerStyles}>
      <Heading as="h1" variant="title">
        <Skeleton loading={loading} variant="text.title" width={[256, 400]}>
          {album?.name}
        </Skeleton>
      </Heading>
      <Heading as="h2" variant="subtitle">
        <Skeleton loading={loading} variant="text.subtitle" width={[200, 256]}>
          <FormattedMessage {...messages.byArtists} values={{ artists }} />
        </Skeleton>
      </Heading>
      <Text variant="content">
        <Skeleton loading={loading} variant="text.content" width={256}>
          <FormattedMessage
            {...messages.releaseDate}
            values={{ date: releaseDate }}
          />
        </Skeleton>
      </Text>
      <Skeleton loading={loading} variant="button" width={144}>
        <Link href={album?.externalUrls.spotify ?? '/'} variant="button">
          <FormattedMessage {...messages.openOnSpotify} />
        </Link>
      </Skeleton>
    </Flex>
  )
}

export default AlbumMetadata
