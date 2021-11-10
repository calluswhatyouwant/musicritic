import { Box, Heading, Link } from '@theme-ui/components'
import { defineMessages, FormattedDate, FormattedMessage } from 'react-intl'

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
  const formattedReleaseDate = (
    <FormattedDate
      value={releaseDate}
      year="numeric"
      month="long"
      day="2-digit"
    />
  )

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
          values={{ date: formattedReleaseDate }}
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
