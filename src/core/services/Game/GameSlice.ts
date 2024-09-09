import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GameService from './GameService';
import { Game, IJoinGameData } from './GameInterface';

interface GameState {
  game: Game | null;
}

const initialState: GameState = {
  game: null,
};

export const getGameThunk = createAsyncThunk(
  'game/getGameThunk',
  async (id: string, { rejectWithValue }) => {
    try {
      return await GameService.getGame(id);
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);

export const joinGameThunk = createAsyncThunk(
  'round/joinGameThunk',
  async (data: IJoinGameData, { rejectWithValue }) => {
    try {
      return await GameService.joinGame(data);
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(joinGameThunk.fulfilled, (state, action) => {
        state.game = action.payload;
      })

      .addCase(getGameThunk.fulfilled, (state, action) => {
        state.game = action.payload;
      })

      .addCase(getGameThunk.rejected, (state) => {
        state.game = null;
      });
  },
});

export const { actions, reducer } = gameSlice;
