import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/core/store/store';

const rooms = (state: RootState) => state.roomsReducer;
export const roomsSelector = createSelector(
  rooms,
  (roomsReducer) => roomsReducer.rooms
);
