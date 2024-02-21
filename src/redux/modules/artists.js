import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import artistsApi from "../../axios/artistsApi";
import { getLocalStorage } from "common/common";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  artists: getLocalStorage("artists")
    ? JSON.parse(getLocalStorage("artists"))
    : null,
  isLoading: false,
  error: null,
};

export const __getArtists = createAsyncThunk(
  "getArtists",
  async (payload, thunkAPI) => {
    try {
      const response = await artistsApi.get("artists");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addFanLetter = createAsyncThunk(
  "artist/addFanLetter",
  async (payload, thunkAPI) => {
    try {
      const currentResponse = await artistsApi.get(
        `artists/${payload.currentArtistId}`
      );
      const prevFanLetters = currentResponse.data.fanLetters;
      const newFanLetter = {
        avatar: payload.avatar ? payload.avatar : "",
        nickname: payload.nickname,
        content: payload.content,
        writedTo: payload.writedTo,
        createdAt: new Date().toString(),
        id: uuidv4(),
        userId: payload.userId,
      };
      const response = await artistsApi.patch(
        `artists/${payload.currentArtistId}`,

        {
          fanLetters: [...prevFanLetters, newFanLetter],
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editFanLetter = createAsyncThunk(
  "artist/editFanLetter",
  async (payload, thunkAPI) => {
    try {
      const currentResponse = await artistsApi.get(
        `artists/${payload.currentArtistId}`
      );
      const prevFanLetters = currentResponse.data.fanLetters;
      const newFanLetters = prevFanLetters.map((letter) => {
        if (letter.id === payload.fanLetterId) {
          return { ...letter, content: payload.content };
        } else {
          return letter;
        }
      });

      const response = await artistsApi.patch(
        `artists/${payload.currentArtistId}`,
        {
          fanLetters: newFanLetters,
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteFanLetter = createAsyncThunk(
  "artist/deleteFanLetter",
  async (payload, thunkAPI) => {
    try {
      const currentResponse = await artistsApi.get(
        `artists/${payload.currentArtistId}`
      );
      const prevFanLetters = currentResponse.data.fanLetters;
      const newFanLetters = prevFanLetters.filter(
        (letter) => letter.id !== payload.fanLetterId
      );
      const response = await artistsApi.patch(
        `artists/${payload.currentArtistId}`,
        {
          fanLetters: newFanLetters,
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getArtists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getArtists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artists = action.payload;
      })
      .addCase(__getArtists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__addFanLetter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__addFanLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artists = state.artists.map((artist) => {
          if (artist.id === action.payload.id) {
            return action.payload;
          }
          return artist;
        });
      })
      .addCase(__addFanLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__editFanLetter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__editFanLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artists = state.artists.map((artist) => {
          if (artist.id === action.payload.id) {
            return action.payload;
          }
          return artist;
        });
      })
      .addCase(__editFanLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__deleteFanLetter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__deleteFanLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artists = state.artists.map((artist) => {
          if (artist.id === action.payload.id) {
            return action.payload;
          }
          return artist;
        });
      })
      .addCase(__deleteFanLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addFanLetter, editFanLetter, deleteFanLetter } =
  artistsSlice.actions;
export default artistsSlice.reducer;
