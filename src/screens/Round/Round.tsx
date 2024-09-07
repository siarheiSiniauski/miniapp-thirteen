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
const data = [
  {
    number: 1,
    name: '1',
    avatar: '/img/thirteen/1.png',
    status: 'WAITING',
    active: false,
  },
  {
    number: 2,
    name: '2',
    avatar: '/img/thirteen/2.png',
    status: 'READY',
    active: false,
  },
  {
    number: 3,
    name: '3',
    avatar: '/img/thirteen/3.png',
    status: 'WAITING',
    active: false,
  },
  {
    number: 4,
    name: '4',
    avatar: '/img/thirteen/4.png',
    status: 'READY',
    active: false,
  },
  {
    number: 5,
    name: '2',
    avatar: '/img/thirteen/5.png',
    status: 'WAITING',
    active: false,
  },
  {
    number: 6,
    name: '3',
    avatar: '/img/thirteen/6.png',
    status: 'WAITING',
    active: false,
  },
  {
    number: 7,
    name: '1',
    avatar: '/img/thirteen/7.png',
    status: 'WAITING',
    active: true,
  },
  {
    number: 8,
    name: '2',
    avatar: '/img/thirteen/8.png',
    status: 'WAITING',
    active: false,
  },
  {
    number: 9,
    name: '3',
    avatar: '/img/thirteen/9.png',
    status: 'WAITING',
    active: false,
  },

  {
    number: 10,
    name: '1',
    avatar: '/img/thirteen/10.png',
    status: 'WAITING',
    active: false,
  },
  {
    number: 11,
    name: '2',
    avatar: '/img/thirteen/11.png',
    status: 'WAITING',
    active: false,
  },
  {
    number: 12,
    name: '3',
    avatar: '/img/thirteen/12.png',
    status: 'WAITING',
    active: false,
  },
  {
    number: 13,
    name: '3',
    avatar: '/img/thirteen/13.png',
    status: 'WAITING',
    active: false,
  },
];

const cnRound = cn('Round');

export const Round: FC = () => {
  const { play } = useAudio({
    url: audioSrc,
    initialVolume: 1,
  });

  const [patron, setPatron] = useState<number>(1);
  const [shooters, setShooters] = useState<any[]>([]);
  const [activeLamp, setActiveLamp] = useState<boolean>(false);

  const [status, setStatus] = useState<
    'WAITING' | 'READY' | 'GAME' | 'GAME_OVER'
  >('WAITING');
  const [round, setRound] = useState<'ONE' | 'TWO' | 'THREE' | 'FOR'>('ONE');
  const [user, setUser] = useState<any | null>(null);
  const [discharge, setDischarge] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      const current = shooters.find((el) => el.number === 7);

      if (current) setUser(current);
    }
  }, [shooters, user]);

  useEffect(() => {
    const current = shooters.filter((el) => el.status === 'READY');

    let isGood = false;
    if (round === 'ONE' && current.length === 13) {
      isGood = true;
    } else if (round === 'TWO' && current.length === 8) {
      isGood = true;
    } else if (round === 'THREE' && current.length === 3) {
      isGood = true;
    } else if (round === 'FOR' && current.length === 2) {
      isGood = true;
    }
    // else if (round === 'FOR' && current.length === 1) {
    //   setStatus('GAME_OVER')
    // }

    if (isGood) {
      setStatus('GAME');
      const interval = Math.floor(Math.random() * 10000);

      setTimeout(() => {
        setActiveLamp(true);
      }, interval);
    }
  }, [shooters]);

  // useEffect(() => {
  //   let timer = 0;
  //   const interval = Math.floor(Math.random() * 1000);

  //   const current = shooters.find(
  //     (el) => el.status === 'WAITING' && user && el.number !== user.number
  //   );

  //   if (current && user) {
  //     const position = shooters.findIndex((el) => el.number === current.number);
  //     timer = setInterval(() => {
  //       const arr = shooters.map((el, i) => {
  //         if (i === position) {
  //           return {
  //             ...el,
  //             status: 'READY',
  //           };
  //         }

  //         return {
  //           ...el,
  //           status: el.status === 'DEAD' ? 'DEAD' : el.status,
  //         };
  //       });

  //       setShooters(arr);
  //     }, interval);
  //   } else {
  //     clearInterval(timer);
  //   }

  //   // очистка интервала
  //   return () => clearInterval(timer);
  // }, [shooters, user]);

  useEffect(() => {
    const position = data.findIndex((el) => el.active);

    const prev = data.slice(0, position);
    const last = data.slice(position, data.length);

    setShooters([...last, ...prev].reverse());
  }, []);

  const resetUser = () => {
    let arr: any[] = [];

    switch (round) {
      case 'ONE':
        {
          setRound('TWO');
          arr = shooters.map((el, i) => {
            if (i === 0 || i === 3 || i === 5 || i === 7 || i === 11) {
              return {
                ...el,
                status: 'DEAD',
              };
            }

            return {
              ...el,
              status: el.status === 'DEAD' ? 'DEAD' : 'WAITING',
            };
          });

          setShooters(arr);
        }
        break;
      case 'TWO':
        {
          setRound('THREE');
          arr = shooters.map((el, i) => {
            if (i === 1 || i === 2 || i === 4 || i === 6 || i === 10) {
              return {
                ...el,
                status: 'DEAD',
              };
            }

            return {
              ...el,
              status: el.status === 'DEAD' ? 'DEAD' : 'WAITING',
            };
          });

          setShooters(arr);
        }
        break;

      case 'THREE':
        {
          setRound('FOR');
          arr = shooters.map((el, i) => {
            if (i === 9) {
              return {
                ...el,
                status: 'DEAD',
              };
            }

            return {
              ...el,
              status: el.status === 'DEAD' ? 'DEAD' : 'WAITING',
            };
          });

          setShooters(arr);
        }
        break;
      case 'FOR':
        {
          setRound('FOR');

          arr = shooters.map((el, i) => {
            if (i === 8) {
              return {
                ...el,
                status: 'DEAD',
              };
            }

            return {
              ...el,
              status: el.status === 'DEAD' ? 'DEAD' : 'WAITING',
            };
          });

          setShooters(arr);
        }
        break;
    }

    setDischarge(false);
    setPatron(patron + 1);
    setActiveLamp(false);
    setStatus('WAITING');

    const current = arr.find((el) => el.number === user.number);

    if (current) setUser(current);

    setShooters(arr);
  };

  const onAction = () => {
    if (user.status === 'WAITING') {
      const arr = shooters.map((el) => {
        if (el.number === user.number) {
          const item = {
            ...el,
            status: 'READY',
          };
          setUser(item);
          return item;
        }

        return el;
      });

      setShooters(arr);
    }

    if (status === 'GAME' && activeLamp) {
      setDischarge(true);

      play();

      setTimeout(() => {
        resetUser();
      }, 3000);
    }
  };

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

            <div className={cnRound('patron')}>{patron}/7</div>
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
