import { combineReducers } from '@reduxjs/toolkit';

import { reducer as appReducer } from '@/core/services/App/AppSlice';
import { reducer as gamesReducer } from '@/core/services/Game/GameSlice';
import { reducer as roomsReducer } from '@/screens/Rooms/store/RoomsSlice';
import { reducer as roundsReducer } from '@/screens/Round/store/RoundSlice';

const rootReducer = combineReducers({
  appReducer,
  gamesReducer,
  roomsReducer,
  roundsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
