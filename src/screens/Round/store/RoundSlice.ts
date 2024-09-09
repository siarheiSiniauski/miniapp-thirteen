import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RoundService from './RoundService';
import { IRound } from './RoundInterface';

interface RoundState {
  round: IRound | null;
  count: number;
}

const initialState: RoundState = {
  round: null,
  count: 1,
};

export const getRoundThunk = createAsyncThunk(
  'round/getRoundThunk',
  async (roundId: string, { rejectWithValue }) => {
    try {
      return await RoundService.getRound(roundId);
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);

export const countByGameIdThunk = createAsyncThunk(
  'round/countByGameIdThunk',
  async (gameId: string, { rejectWithValue }) => {
    try {
      return await RoundService.countByGameId(gameId);
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);

const roundSlice = createSlice({
  name: 'round',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getRoundThunk.fulfilled, (state, action) => {
        state.round = action.payload;
      })
      .addCase(getRoundThunk.rejected, (state) => {
        state.round = null;
      })

      .addCase(countByGameIdThunk.fulfilled, (state, action) => {
        state.count = action.payload;
      });
  },
});

export const { actions, reducer } = roundSlice;
