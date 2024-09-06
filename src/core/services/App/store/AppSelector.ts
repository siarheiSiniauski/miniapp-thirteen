import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/core/store/store';

const initData = (state: RootState) => state.appReducer;
export const initDataSelector = createSelector(
  initData,
  (appReducer) => appReducer.initData
);

const user = (state: RootState) => state.appReducer;
export const userSelector = createSelector(
  user,
  (appReducer) => appReducer.user
);
