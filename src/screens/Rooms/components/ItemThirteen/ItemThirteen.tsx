import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';

import { IRoom } from '../../store/RoomsInterface';
import { Icon } from '@/components/UI/Icon';

import './ItemThirteen.scss';

const cnItemThirteen = cn('ItemThirteen');

interface IItemThirteenProps {
  item: IRoom;
  className?: string;
  join: (id: string) => void;
  loadRoomId?: string;
}

export const ItemThirteen: FC<IItemThirteenProps> = ({
  item,
  className,
  join,
  loadRoomId,
}) => {
  const { t } = useTranslation('translation');
  return (
    <div className={cnItemThirteen(null, [className])}>
      <div className={cnItemThirteen('title')}>{t(item.name)}</div>

      <div className={cnItemThirteen('wrap')}>
        <div className={cnItemThirteen('left')}>
          <div className={cnItemThirteen('item')}>
            <div className={cnItemThirteen('value')}>
              {item.slots}
              {/* /{item.total} */}
            </div>
            <div className={cnItemThirteen('label')}>{t('room-slots')}</div>
          </div>
          <div className={cnItemThirteen('item')}>
            <div className={cnItemThirteen('value')}>{item.price}</div>
            <div className={cnItemThirteen('label')}>
              {t('room-price')}
              <Icon name="ton" />
            </div>
          </div>
          <div className={cnItemThirteen('item')}>
            <div className={cnItemThirteen('value')}>{item.pool}</div>
            <div className={cnItemThirteen('label')}>
              {t('room-pool')}
              <Icon name="ton" />
            </div>
          </div>
        </div>
        <button
          disabled={item.isSoon || !!loadRoomId}
          type="button"
          className={cnItemThirteen('button')}
          onClick={() => join(item.id)}
        >
          <span>{item.isSoon ? t('room-btn-soon') : t('room-btn-join')}</span>
        </button>
      </div>
    </div>
  );
};
