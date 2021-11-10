import { Box, Heading, Link } from '@theme-ui/components'
import { defineMessages, FormattedMessage } from 'react-intl'

const messages = defineMessages({
  byArtists: { id: 'musicritic.album-page.by-artists' },
  releaseDate: { id: 'musicritic.album-page.release-date' },
  openOnSpotify: { id: 'musicritic.album-page.open-on-spotify' },
})

interface Props {
  name: string
  artist: string
  album: string
  length: string
  releaseDate: string
  spotifyURL: string
}

const TrackMetadata = ({
  name,
  artist,
  album,
  length,
  releaseDate,
  spotifyURL,
}: Props) => {
  return (
    <Box>
      <Heading variant="title">{name}</Heading>
      <Heading variant="subtitle">
        <FormattedMessage
          {...messages.byArtists}
          values={{ artists: artist }}
        />
      </Heading>
      <Box>{album}</Box>
      <Box sx={{ marginBottom: 4 }}>
        <FormattedMessage
          {...messages.releaseDate}
          values={{ date: releaseDate }}
        />{' '}
        · {length}
      </Box>
      <Link href={spotifyURL ?? '/'} variant="button">
        <FormattedMessage {...messages.openOnSpotify} />
      </Link>
    </Box>
  )
}

export default TrackMetadata
