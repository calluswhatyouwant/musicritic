import type { FC, PropsWithChildren } from 'react'
import { useState } from 'react'
import { Image } from 'theme-ui'

import type { SkeletonProps } from './Skeleton'
import Skeleton, { setSkeletonDimensions } from './Skeleton'

interface Props extends SkeletonProps {
  alt: string
  src: string
}

const SkeletonImage: FC<PropsWithChildren<Props>> = ({
  alt,
  src,
  height = 'auto',
  width = 'auto',
  loading: loadingData,
  ...skeletonProps
}) => {
  const [loadingImage, setLoadingImage] = useState(true)

  return (
    <>
      <Skeleton
        loading={loadingData || loadingImage}
        height={height}
        width={width}
        {...skeletonProps}
      />
      <Image
        src={src}
        onLoad={() => {
          setLoadingImage(false)
        }}
        alt={alt}
        sx={{
          ...setSkeletonDimensions(height, width),
          display: loadingData || loadingImage ? 'none' : 'block',
          ...skeletonProps.sx,
        }}
      />
    </>
  )
}

export default SkeletonImage
