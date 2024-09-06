import { FC, ReactNode, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import dayjs from 'dayjs';
import {
  InitData,
  initInitData,
  useLaunchParams,
} from '@telegram-apps/sdk-react';

import { useAppDispatch } from '@/core/store/hooks';
import { verifyUserThunk } from '@/core/services/App/store/AppSlice';

import './Root.scss';
import { useTranslation } from 'react-i18next';

const cnRoot = cn('Root');

interface RootProps {
  children: ReactNode;
}

export const Root: FC<RootProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const initData = initInitData();
  const { i18n } = useTranslation();
  const lp = useLaunchParams();

  useEffect(() => {
    if (lp && lp.initDataRaw) {
      verifyUser(lp.initDataRaw);
    }
  }, []);

  useEffect(() => {
    if (initData) {
      if (initData.user && initData.user.languageCode) {
        i18n.changeLanguage(initData.user.languageCode);
        localStorage.setItem('lang', initData.user.languageCode);
      }
    }
  }, []);

  const verifyUser = async (query: string) => {
    try {
      await dispatch(verifyUserThunk(query));
    } catch (error) {
      console.log('verifyUserThunk', error);
    }
  };

  return <div className={cnRoot()}>{children}</div>;
};
