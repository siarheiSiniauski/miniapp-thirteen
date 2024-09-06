import { FC } from 'react'
import { cn } from '@bem-react/classname'

import { Icon } from '../../../../components/UI/Icon'

import loading from '../../../../assets/img/loading-circle.png'

import './Shooter.scss'

const cnShooter = cn('Shooter')

interface IShooterProps {
  className?: string
  active?: boolean
  status?: 'WAITING' | 'READY'
  dead?: boolean
  shot?: boolean
  avatar?: string
  username?: string
}

export const Shooter: FC<IShooterProps> = ({
  active = false,
  className,
  dead,
  // shot,
  status,
  avatar,
  username,
}) => {
  return (
    <div className={cnShooter({ active, dead }, [className])}>
      <div className={cnShooter('avatar', { active, dead })}>
        <img src={avatar} alt={username} />
      </div>

      {!dead && (
        <div
          className={cnShooter('status', {
            waiting: status === 'WAITING',
            ready: status === 'READY',
          })}
        >
          {status === 'READY' ? (
            <Icon name='status-ready' width={12} height={12} />
          ) : (
            <img src={loading} alt='' />
          )}
        </div>
      )}
    </div>
  )
}
