import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/core/store/store';

const round = (state: RootState) => state.roundsReducer;
export const roundSelector = createSelector(
  round,
  (roundsReducer) => roundsReducer.round
);

const count = (state: RootState) => state.roundsReducer;
export const countSelector = createSelector(
  count,
  (roundsReducer) => roundsReducer.count
);
