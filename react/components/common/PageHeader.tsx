import { Flex } from '@theme-ui/components'
import type { ThemeUIStyleObject } from 'theme-ui'
import type { PropsWithChildren } from 'hoist-non-react-statics/node_modules/@types/react'

import RatingBadge from '@/components/common/RatingBadge'
import SkeletonImage from '@/components/common/SkeletonImage'

const containerStyles: ThemeUIStyleObject = {
  flexDirection: ['column', 'column', 'row'],
  backgroundColor: 'muted.0',
  width: '100%',
  padding: [3, 4, 6, 16],
  justifyContent: 'space-between',
  alignItems: 'center',
}

interface Props {
  imgUrl: string
  imgAlt: string
  loading?: boolean
  rating?: number
}

const PageHeader = ({
  imgUrl,
  imgAlt,
  rating = 5,
  loading = false,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Flex sx={containerStyles}>
      <Flex sx={{ alignItems: 'center' }}>
        <Flex sx={{ marginRight: 4 }}>
          <SkeletonImage
            loading={loading}
            alt={imgAlt}
            src={imgUrl}
            height={280}
            width={280}
          />
        </Flex>
        {children}
      </Flex>
      <RatingBadge rating={rating} />
    </Flex>
  )
}

export default PageHeader
