import { FC } from 'react'
import { cn } from '@bem-react/classname'

import image from '../../../../assets/img/thirteen/13.svg'
import './ThirteenTop.scss'

const cnThirteenTop = cn('ThirteenTop')

interface IThirteenTopProps {
  className?: string
  title?: string
}

export const ThirteenTop: FC<IThirteenTopProps> = ({ title, className }) => {
  return (
    <div className={cnThirteenTop(null, [className])}>
      <div className={cnThirteenTop('image')}>
        <img src={image} alt='13' />
      </div>
      {title && <div className={cnThirteenTop('title')}>{title}</div>}
    </div>
  )
}
