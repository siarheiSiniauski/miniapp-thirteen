import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RoundService from './RoundService';
import { IJoinGameData } from './RoundInterface';

interface RoomsState {
  data: any;
}

const initialState: RoomsState = {
  data: null,
};

export const joinGameThunk = createAsyncThunk(
  'round/joinGameThunk',
  async (data: IJoinGameData, { rejectWithValue }) => {
    try {
      return await RoundService.joinGame(data);
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
    builder;

    // .addCase(getRoomsThunk.fulfilled, (state, action) => {
    //   state.rooms = action.payload;
    // })
    // .addCase(getRoomsThunk.rejected, (state) => {
    //   state.rooms = [];
    // });
  },
});

export const { actions, reducer } = roundSlice;
