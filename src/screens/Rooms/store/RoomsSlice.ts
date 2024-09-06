import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RoomsService from './RoomsService';
import { IRoom } from './RoomsInterface';

interface RoomsState {
  rooms: IRoom[];
}

const initialState: RoomsState = {
  rooms: [],
};

export const getRoomsThunk = createAsyncThunk(
  'app/getRoomsThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await RoomsService.getRooms();
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getRoomsThunk.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(getRoomsThunk.rejected, (state) => {
        state.rooms = [];
      });
  },
});

export const { actions, reducer } = roomsSlice;
