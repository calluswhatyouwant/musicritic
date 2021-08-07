import type { FC } from 'react'
import type { ThemeUIStyleObject } from 'theme-ui'
import { Text, Button, Flex } from 'theme-ui'

interface Props {
  upvotes: number
  downvotes: number
}

const reactionButtonStyles: ThemeUIStyleObject = {
  padding: 1,
  gap: 1,
  color: 'text',
  backgroundColor: 'transparent',
  ':hover': {
    backgroundColor: 'muted.0',
    cursor: 'pointer',
  },
}

const AlbumReviewReactions: FC<Props> = ({ upvotes, downvotes }) => (
  <Flex
    sx={{
      justifyContent: 'flex-end',
      width: '100%',
      paddingTop: 2,
      borderRadius: 4,
      gap: 3,
    }}
  >
    <Flex sx={{ alignItems: 'center', gap: 1 }}>
      <Button sx={reactionButtonStyles}>
        <span role="img" aria-label="Thumbs up">
          👍
        </span>
      </Button>
      <Text>{upvotes}</Text>
    </Flex>
    <Flex sx={{ alignItems: 'center', gap: 1 }}>
      <Button sx={reactionButtonStyles}>
        <span role="img" aria-label="Thumbs down">
          👎
        </span>
      </Button>
      <Text>{downvotes}</Text>
    </Flex>
  </Flex>
)

export default AlbumReviewReactions
