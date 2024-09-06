import { FC } from 'react'
import { cn } from '@bem-react/classname'

import lamp from '../../../../assets/img/thirteen/lamp.png'
import lampActive from '../../../../assets/img/thirteen/lamp-active.png'

import './Lamp.scss'

const cnLamp = cn('Lamp')

interface ILampProps {
  className?: string
  active?: boolean
}

export const Lamp: FC<ILampProps> = ({ active = false, className }) => {
  return (
    <div className={cnLamp({ active }, [className])}>
      {active ? (
        <img src={lampActive} alt='Lamp' />
      ) : (
        <img src={lamp} alt='Lamp' />
      )}
    </div>
  )
}
