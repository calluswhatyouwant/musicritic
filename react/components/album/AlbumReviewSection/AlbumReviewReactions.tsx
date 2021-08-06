import type { FC } from 'react'
import type { ThemeUIStyleObject } from 'theme-ui'
import { Badge, Button, Flex } from 'theme-ui'

const badgeStyles: ThemeUIStyleObject = {
  color: 'black',
  height: 42,
  backgroundColor: '#EEE',
  borderRadius: 0,
  padding: 2,
  display: 'flex',
  alignItems: 'center',
  fontSize: 1,
}

const AlbumReviewReactions: FC = () => (
  <Flex
    sx={{
      justifyContent: 'flex-end',
      width: '100%',
      paddingTop: 2,
      borderRadius: 4,
    }}
  >
    <Button
      sx={{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#EEE',
      }}
    >
      <span role="img" aria-label="Thumbs up">
        👍
      </span>
    </Button>
    <Badge sx={badgeStyles}>+10</Badge>
    <Button
      sx={{
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: '#EEE',
      }}
    >
      <span role="img" aria-label="Thumbs down">
        👎
      </span>
    </Button>
  </Flex>
)

export default AlbumReviewReactions
