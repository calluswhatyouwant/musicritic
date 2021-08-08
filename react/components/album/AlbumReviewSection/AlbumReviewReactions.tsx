import type { FC } from 'react'
import { Text, Flex } from 'theme-ui'

import ReactionButton from './ReactionButton'

interface Props {
  upvotes: number
  downvotes: number
}

const AlbumReviewReactions: FC<Props> = ({ upvotes, downvotes }) => (
  <>
    <Flex sx={{ alignItems: 'center', gap: 1 }}>
      <ReactionButton variant="upvote" />
      <Text sx={{ color: 'green', lineHeight: 1.25 }}>{upvotes}</Text>
    </Flex>
    <Flex sx={{ alignItems: 'center', gap: 1 }}>
      <ReactionButton variant="downvote" />
      <Text sx={{ color: 'red', lineHeight: 1.25 }}>{downvotes}</Text>
    </Flex>
  </>
)

export default AlbumReviewReactions
