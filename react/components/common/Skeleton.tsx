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
}

const Skeleton: FC<PropsWithChildren<Props>> = ({
  sx = {},
  children,
  loading,
  count = 1,
}) =>
  loading ? (
    <>
      {[...Array(count)].map((_, index) => (
        <Box
          key={index}
          css={css`
            animation: ${loadingAnimation} 1.5s ease-in-out infinite;
          `}
          sx={{
            borderRadius: '4px',
            width: '100%',
            height: '100%',
            ...sx,
          }}
        />
      ))}
    </>
  ) : (
    <>{children}</>
  )

export default Skeleton
