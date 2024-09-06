import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { motion } from 'framer-motion';

import './Start.scss';

import logo from '../../assets/img/thirteen/logo.png';
import number from '../../assets/img/thirteen/13.svg';
import useIncrement from '../../hooks/useIncrement';
import { useNavigate } from 'react-router-dom';

const cnStart = cn('Start');

export const Start: FC = () => {
  const navigate = useNavigate();
  // const { play } = useAudio({
  //   url: audio,
  //   initialVolume: 0.75,
  // })

  // const [controls, audio] = useAudio({
  //   src: audioSrc,
  //   autoPlay: true,
  // })

  const endAction = () => {
    // useVibrate(true, [300, 100, 200, 100, 1000, 300], false)
    // controls
    navigate('/rooms');
  };

  const currentValue = useIncrement(0, 100, endAction);

  return (
    <div className={cnStart()}>
      <div className={cnStart('center')}>
        <div className={cnStart('group')}>
          <motion.img
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            src={logo}
            alt="13"
          />
          <motion.img
            src={number}
            alt="13"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
        </div>

        <div className={cnStart('loading')}>
          <div className={cnStart('bar')}>
            <div
              style={{ width: currentValue + '%' }}
              className={cnStart('progress')}
            ></div>
          </div>
          <div className={cnStart('percent')}>{currentValue}%</div>
        </div>
      </div>
    </div>
  );
};
