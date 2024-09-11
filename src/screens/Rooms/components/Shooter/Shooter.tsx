import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { Icon } from '@/components/UI/Icon';
import loading from '@/assets/img/loading-circle.png';

import './Shooter.scss';
import { Participant, RoundStatus } from '@/screens/Round/store/RoundInterface';

const cnShooter = cn('Shooter');

interface IShooterProps {
  className?: string;
  participant: Participant;
  telegramId?: number;
  status: RoundStatus;
}

export const Shooter: FC<IShooterProps> = ({
  className,
  participant,
  telegramId,
  status,
}) => {
  console.log(participant.status);
  console.log(status);

  return (
    <div
      className={cnShooter(
        {
          active: participant.telegramId === telegramId,
          dead: participant.status === 'DEAD',
        },
        [className]
      )}
    >
      <div
        className={cnShooter('avatar', {
          active: participant.telegramId === telegramId,
          dead: participant.status === 'DEAD',
        })}
      >
        {participant && participant.avatar && (
          <img src={participant.avatar} alt={participant.name} />
        )}
      </div>

      <div className={cnShooter('position')}>
        {participant.position <= 9
          ? '0' + participant.position
          : participant.position}
      </div>

      {participant.status === 'ALIVE' && status !== 'RECRUITMENT' && (
        <div
          className={cnShooter('status', {
            waiting: status === 'WAITING',
            ready: status === 'READY',
          })}
        >
          {status === 'READY' ? (
            <Icon name="status-ready" width={12} height={12} />
          ) : (
            <img src={loading} alt="" />
          )}
        </div>
      )}
    </div>
  );
};
