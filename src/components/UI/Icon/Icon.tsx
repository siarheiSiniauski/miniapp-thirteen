import { FC } from 'react'
import InlineSVG from 'react-inlinesvg'

export interface IIcon {
  name?: string
  fill?: string
  stroke?: string
  className?: string
  width?: number
  height?: number
}

export const Icon: FC<IIcon> = ({ name, ...props }: IIcon): JSX.Element => {
  const src = `/icons/${name}.svg`

  return (
    <InlineSVG
      onError={(error) => console.log(error)}
      // onLoad={(src, hasCache) => console.log(src, hasCache)}
      // preProcessor={code => code.replace(/fill=".*?"/g, 'fill="currentColor"')}
      src={src}
      {...props}
    />
  )
}
