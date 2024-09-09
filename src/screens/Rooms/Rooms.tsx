import { FC, useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';
import { initInitData } from '@telegram-apps/sdk-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { getRoomsThunk } from './store/RoomsSlice';
import { roomsSelector } from './store/RoomsSelector';
import { joinGameThunk } from '@/core/services/Game/GameSlice';

import { ThirteenTop } from './components/ThirteenTop';
import { ItemThirteen } from './components/ItemThirteen';

import './styles/Rooms.scss';

const cnRooms = cn('Rooms');

export const Rooms: FC = () => {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();
  const initData = initInitData();
  const navigate = useNavigate();

  const rooms = useAppSelector(roomsSelector);

  const [loadRoomId, setLoadRoomId] = useState<string>('');

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

    setLoadRoomId(id);

    try {
      const res = await dispatch(
        joinGameThunk({ roomId: id, telegramId: initData.user.id })
      ).unwrap();

      if (res && res.id) {
        const gameId = res.id;
        const roundId = res.rounds[0].id;

        navigate(`/games/${gameId}/round/${roundId}`);
      }

      setLoadRoomId('');
    } catch (error) {
      console.log('getRoomsThunk error', error);
      setLoadRoomId('');
    }
  };

  const sortedData = [...rooms].sort((a, b) => a.price - b.price);

  return (
    <div className={cnRooms()}>
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
              <ItemThirteen
                key={room.id}
                item={room}
                join={join}
                loadRoomId={loadRoomId}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
