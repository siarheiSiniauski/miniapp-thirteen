import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/core/store/store';

const game = (state: RootState) => state.gamesReducer;
export const gameSelector = createSelector(
  game,
  (gamesReducer) => gamesReducer.game
);
