import { cn } from '@bem-react/classname';
import { FC } from 'react';

import svg from '@/assets/img/loading.svg';
import png from '@/assets/img/loading.png';
import './Loading.scss';

export interface LoadingProps {
  className?: string;
}
const cnLoading = cn('Loading');

export const Loading: FC<LoadingProps> = ({ className }): JSX.Element => {
  return (
    <div className={cnLoading(null, [className])}>
      <div className={cnLoading('wrap')}>
        <img src={svg} alt="load" />
        <div className={cnLoading('load')}>
          <img src={png} alt="load" />
        </div>
      </div>
    </div>
  );
};
