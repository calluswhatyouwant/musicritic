import type { FC } from 'react'
import type { ThemeUIStyleObject } from 'theme-ui'
import { Text, Flex } from 'theme-ui'

import ReactionButton from './ReactionButton'

interface Props {
  upvotes: number
  downvotes: number
}

const buttonContainerStyles: ThemeUIStyleObject = {
  alignItems: 'center',
  gap: 1,
}

const AlbumReviewReactions: FC<Props> = ({ upvotes, downvotes }) => (
  <>
    <Flex sx={buttonContainerStyles}>
      <ReactionButton variant="upvote" />
      <Text sx={{ color: 'green' }}>{upvotes}</Text>
    </Flex>
    <Flex sx={buttonContainerStyles}>
      <ReactionButton variant="downvote" />
      <Text sx={{ color: 'red' }}>{downvotes}</Text>
    </Flex>
  </>
)

export default AlbumReviewReactions
