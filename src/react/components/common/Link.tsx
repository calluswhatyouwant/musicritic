import type { FC, PropsWithChildren } from 'react'
import type { LinkProps } from 'next/link'
import NextLink from 'next/link'
import type { ThemeUIStyleObject } from 'theme-ui'
import { Link as ThemeUILink } from 'theme-ui'

interface Props extends LinkProps {
  variant?: string
  sx?: ThemeUIStyleObject
}

const Link: FC<PropsWithChildren<Props>> = ({
  children,
  variant,
  sx = {},
  ...props
}) => (
  <NextLink {...props} passHref>
    <ThemeUILink variant={variant} sx={sx}>
      {children}
    </ThemeUILink>
  </NextLink>
)

export default Link
