import type { FC, PropsWithChildren } from 'react'
import NextLink from 'next/link'
import type { ThemeUIStyleObject } from 'theme-ui'
import { Link as ThemeUILink } from 'theme-ui'

interface Props {
  href: string
  sx?: ThemeUIStyleObject
}

const Link: FC<PropsWithChildren<Props>> = ({ href, children, sx = {} }) => (
  <NextLink href={href} passHref>
    <ThemeUILink sx={sx}>{children}</ThemeUILink>
  </NextLink>
)

export default Link
