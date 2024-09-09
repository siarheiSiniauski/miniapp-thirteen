import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { InitData, User } from '@telegram-apps/sdk-react';
import AppService from './AppService';

interface AppState {
  initData: InitData | null;
  user: User | null;
}

const initialState: AppState = {
  initData: null,
  user: null,
};

export const getUserDataThunk = createAsyncThunk(
  'app/getUserDataThunk',
  async (telegramId: number, { rejectWithValue }) => {
    try {
      return await AppService.getUserData(telegramId);
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);

export const verifyUserThunk = createAsyncThunk(
  'app/verifyUserThunk',
  async (query: string, { rejectWithValue }) => {
    try {
      return await AppService.verifyUser(query);
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitData(state, action) {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getUserDataThunk.fulfilled, (state, action) => {
        state.initData = action.payload;
      })
      .addCase(getUserDataThunk.rejected, (state) => {
        state.initData = null;
      });
  },
});

export const { actions, reducer } = appSlice;
export const { setInitData } = actions;
