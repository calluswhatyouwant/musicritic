import type { FC } from 'react'
import { Box, Text } from 'theme-ui'

import IconStar from '../icons/IconStar'
import IconStarHalf from '../icons/IconStarHalf'

interface Props {
  value?: number
}

const Rating: FC<Props> = ({ value = 0 }) => {
  const fullStars = Math.floor(value)

  const icons = [...Array(fullStars)].map((_, index) => (
    <IconStar key={index} color="#FDE74C" solid />
  ))

  if (fullStars !== value)
    icons.push(<IconStarHalf key={value} color="#FDE74C" solid />)

  return (
    <>
      <Box
        sx={{
          display: ['none', 'none', 'flex'],
        }}
      >
        {icons}
      </Box>
      <Box
        sx={{
          display: ['flex', 'flex', 'none'],
          gap: 1,
        }}
      >
        <Text>{value}</Text>
        <IconStar color="#FDE74C" solid />
      </Box>
    </>
  )
}

export default Rating
