import { FC, useEffect } from 'react';
import { cn } from '@bem-react/classname';

import { ThirteenTop } from './components/ThirteenTop';

import './styles/Rooms.scss';
import { ItemThirteen } from './components/ItemThirteen';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { getRoomsThunk } from './store/RoomsSlice';
import { roomsSelector } from './store/RoomsSelector';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { joinGameThunk } from '../Round/store/RoundSlice';
import { initInitData } from '@telegram-apps/sdk-react';

const cnRooms = cn('Rooms');

export const Rooms: FC = () => {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();
  const initData = initInitData();

  const rooms = useAppSelector(roomsSelector);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    try {
      await dispatch(getRoomsThunk()).unwrap();
    } catch (error) {
      console.log('getRoomsThunk error', error);
    }
  };

  const join = async (id: string) => {
    if (!initData || !initData.user) {
      return;
    }

    try {
      await dispatch(
        joinGameThunk({ gameId: id, telegramId: initData.user.id })
      ).unwrap();
    } catch (error) {
      console.log('getRoomsThunk error', error);
    }
  };

  const sortedData = [...rooms].sort((a, b) => a.price - b.price);

  return (
    <div className={cnRooms()}>
      {JSON.stringify(sortedData)}
      <AnimatePresence initial={false}>
        <motion.div
          initial={{ opacity: 0, y: '10%' }}
          exit={{ opacity: 0, y: '10%' }}
          animate={{ opacity: 1, y: 0 }}
          className={cnRooms('page')}
        >
          <ThirteenTop title={t('room-title')} />
          <div className={cnRooms('list')}>
            {sortedData.map((room) => (
              <ItemThirteen key={room.id} item={room} join={join} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
