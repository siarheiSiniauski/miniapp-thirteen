import { FC, useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';

import { ThirteenTop } from '../Rooms/components/ThirteenTop';
import { Lamp } from '../Rooms/components/Lamp';
import { Shooter } from '../Rooms/components/Shooter';

import useAudio from '../../hooks/useAudio';
import audioSrc from '../../assets/audio/b05e1ac8be34248.mp3';
import patrons from '../../assets/img/thirteen/patrons.png';
import revolver from '../../assets/img/thirteen/revolver.png';

import './styles/Round.scss';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { gameSelector } from '@/core/services/Game/GameSelector';
import { getGameThunk } from '@/core/services/Game/GameSlice';
import { countByGameIdThunk, getRoundThunk } from './store/RoundSlice';
import { countSelector, roundSelector } from './store/RoundSelector';
import { useInitData } from '@telegram-apps/sdk-react';

const cnRound = cn('Round');

export const Round: FC = () => {
  const dispatch = useAppDispatch();
  const initData = useInitData();
  const { gameId, roundId } = useParams<{ gameId: string; roundId: string }>();
  const { play } = useAudio({
    url: audioSrc,
    initialVolume: 1,
  });

  const round = useAppSelector(roundSelector);
  const count = useAppSelector(countSelector);

  const [patron, setPatron] = useState<number>(1);
  const [shooters, setShooters] = useState<any[]>([]);
  const [activeLamp, setActiveLamp] = useState<boolean>(false);

  const [status, setStatus] = useState<
    'WAITING' | 'READY' | 'GAME' | 'GAME_OVER'
  >('WAITING');
  // const [round, setRound] = useState<'ONE' | 'TWO' | 'THREE' | 'FOR'>('ONE');
  const [user, setUser] = useState<any | null>(null);
  const [discharge, setDischarge] = useState<boolean>(false);

  useEffect(() => {
    if (roundId) {
      getRound(roundId);
    }
  }, [roundId]);

  const getRound = async (roundId: string) => {
    try {
      const res = await dispatch(getRoundThunk(roundId)).unwrap();

      if (res) {
        await dispatch(countByGameIdThunk(res.gameId)).unwrap();
      }
    } catch (error) {
      console.log('getRoundThunk', error);
    }
  };

  useEffect(() => {
    if (!user) {
      const current = shooters.find((el) => el.number === 7);

      if (current) setUser(current);
    }
  }, [shooters, user]);

  useEffect(() => {
    if (round && initData && initData.user && initData.user.id) {
      const telegramId = initData.user.id;
      const participants = round.participants;

      const position = participants.findIndex(
        (el) => el.telegramId === telegramId
      );

      const prev = participants.slice(0, position);
      const last = participants.slice(position, participants.length);

      setShooters([...last, ...prev].reverse());
    }
  }, [round, initData]);

  const resetUser = () => {};

  const onAction = () => {};

  console.log('round', round);
  console.log('count', count);

  return (
    <div className={cnRound()}>
      <ThirteenTop title={`Round ${round}`} />
      <div className={cnRound('wrap')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="292"
          height="467"
          viewBox="0 0 292 467"
          fill="none"
          className={cnRound('arrow')}
        >
          <path
            d="M215.293 458.793C214.902 459.183 214.902 459.817 215.293 460.207L221.657 466.571C222.047 466.962 222.681 466.962 223.071 466.571C223.462 466.181 223.462 465.547 223.071 465.157L217.414 459.5L223.071 453.843C223.462 453.453 223.462 452.819 223.071 452.429C222.681 452.038 222.047 452.038 221.657 452.429L215.293 458.793ZM2.5 373.5V21H0.5V373.5H2.5ZM21.5 2H270.5V0H21.5V2ZM289.5 21V439.5H291.5V21H289.5ZM270.5 458.5H216V460.5H270.5V458.5ZM289.5 439.5C289.5 449.993 280.993 458.5 270.5 458.5V460.5C282.098 460.5 291.5 451.098 291.5 439.5H289.5ZM270.5 2C280.993 2 289.5 10.5066 289.5 21H291.5C291.5 9.40202 282.098 0 270.5 0V2ZM2.5 21C2.5 10.5066 11.0066 2 21.5 2V0C9.90202 0 0.5 9.40202 0.5 21H2.5Z"
            fill="#B80000"
          />
        </svg>

        <Lamp className={cnRound('lamp')} active={activeLamp} />

        <div
          className={cnRound('status', {
            waiting: status === 'WAITING',
            game: status === 'GAME',
          })}
        >
          {status === 'WAITING'
            ? 'We are waiting for players...'
            : 'When the light comes on, take a shot'}
        </div>

        <div className={cnRound('info')}>
          <div className={cnRound('revolver')}>
            <img src={revolver} alt="revolver" />
            <div className={cnRound('patrons')}>
              <img src={patrons} alt="patrons" />
            </div>

            <div className={cnRound('patron')}>{count}/6</div>
          </div>
        </div>

        <div className={cnRound('shooters')}>
          {shooters.map((shooter) => (
            <div
              key={shooter.number}
              data-number={shooter.number}
              className={cnRound('shooter')}
            >
              <Shooter
                active={shooter.active}
                avatar={shooter.avatar}
                status={shooter.status}
                dead={shooter.status === 'DEAD'}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={cnRound('action')}>
        <button
          type="button"
          className={cnRound('btn', { game: status === 'GAME' })}
          onClick={onAction}
          disabled={
            (status === 'WAITING' &&
              user &&
              user.status === 'READY' &&
              !activeLamp) ||
            discharge ||
            status === 'GAME_OVER'
          }
        >
          <span>
            {status === 'WAITING' &&
              user &&
              user.status === 'WAITING' &&
              "I'm ready"}

            {status === 'WAITING' && user && user.status === 'READY' && '...'}

            {status === 'GAME' && 'Shot'}
            {status === 'GAME_OVER' && 'GAME OVER'}
          </span>
          <span></span>
        </button>
      </div>
    </div>
  );
};
