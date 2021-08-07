import type { FC } from 'react'

interface Props {
  value: number
}

const Rating: FC<Props> = ({ value }) => (
  <span role="img" aria-label="Star">
    {'⭐️'.repeat(value)}
  </span>
)

export default Rating
