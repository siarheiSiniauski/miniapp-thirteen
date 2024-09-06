import { combineReducers } from '@reduxjs/toolkit';

import { reducer as roomsReducer } from '@/screens/Rooms/store/RoomsSlice';
import { reducer as appReducer } from '@/core/services/App/store/AppSlice';

const rootReducer = combineReducers({
  appReducer,
  roomsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
