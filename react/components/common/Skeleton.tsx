import type { FC, PropsWithChildren } from 'react'
import { css, keyframes } from '@emotion/react'
import { Box } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

const loadingAnimation = keyframes(`
  0%, 100% {
    background-color: #EBEBEF;
  }
  50% {
    background-color: #CBCBCF;
  }
`)

interface Props {
  loading: boolean
  count?: number
  sx?: ThemeUIStyleObject
  height?: number | string | Array<number | string>
  width?: number | string | Array<number | string>
  shape?: 'rect' | 'circle'
  variant?: string
}

const Skeleton: FC<PropsWithChildren<Props>> = ({
  children,
  loading,
  count = 1,
  height = 'auto',
  width = 'auto',
  sx = {},
  shape = 'rect',
  variant = '',
}) => {
  const skeleton = [...Array(count)].map((_, index) => (
    <Box
      key={index}
      css={css`
        animation: ${loadingAnimation} 1.5s ease-in-out infinite;
      `}
      sx={{
        borderRadius: shape === 'rect' ? '4px' : '100%',
        width,
        height,
        minWidth: width,
        minHeight: height,
        maxWidth: width,
        maxHeight: height,
        variant: `skeleton.${variant}`,
        ...sx,
      }}
    />
  ))

  return <>{loading ? skeleton : children}</>
}

export default Skeleton
