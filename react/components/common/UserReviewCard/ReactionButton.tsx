import type { FC } from 'react'
import { useState } from 'react'
import type { ThemeUIStyleObject } from 'theme-ui'
import { Button } from 'theme-ui'

import IconThumbsDown from '@/components/icons/IconThumbsDown'
import IconThumbsUp from '@/components/icons/IconThumbsUp'

const baseStyles: ThemeUIStyleObject = {
  padding: 1,
  borderRadius: '.75rem',
  height: '1.5rem',
  width: '1.5rem',
  gap: 1,
  color: 'text',
  backgroundColor: 'transparent',
}

const upvoteStyles: ThemeUIStyleObject = {
  ...baseStyles,
  ':hover': {
    backgroundColor: '#e5f4d5',
    cursor: 'pointer',
  },
}

const downvoteButtonStyles: ThemeUIStyleObject = {
  ...baseStyles,
  ':hover': {
    backgroundColor: '#F9E2E3',
    cursor: 'pointer',
  },
}

interface Props {
  variant: 'upvote' | 'downvote'
}

const ReactionButton: FC<Props> = ({ variant }) => {
  const [solid, setSolid] = useState(false)
  const icon =
    variant === 'upvote' ? (
      <IconThumbsUp solid={solid} color="green" />
    ) : (
      <IconThumbsDown solid={solid} color="red" />
    )

  return (
    <Button
      onMouseOver={() => setSolid(true)}
      onMouseOut={() => setSolid(false)}
      sx={variant === 'upvote' ? upvoteStyles : downvoteButtonStyles}
    >
      {icon}
    </Button>
  )
}

export default ReactionButton
