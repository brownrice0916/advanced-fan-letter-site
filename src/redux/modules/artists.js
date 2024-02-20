import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import artistsApi from "../../axios/artistsApi";
import { getLocalStorage, saveLocalStorage } from "common/common";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import FanLetter from "pages/FanLetter/FanLetter";

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
      console.log("getArtists", response.data);
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
      console.log("fanletters", prevFanLetters);
      const newFanLetter = {
        avatar: payload.avatar ? payload.avatar : "",
        nickname: payload.nickname,
        content: payload.content,
        writedTo: payload.writedTo,
        createdAt: new Date().toString(),
        id: uuidv4(),
      };
      const response = await artistsApi.patch(
        `artists/${payload.currentArtistId}`,

        {
          fanLetters: [...prevFanLetters, newFanLetter],
        }
      );

      //  saveLocalStorage("artists", response.data);
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
      // console.log("newFanLetters in artists", newFanLetters);
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
      console.log("newFanLetters in artists", newFanLetters);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    // addFanLetter: (state, action) => {
    //   const newFanLetter = {
    //     id: uuidv4(),
    //     nickname: action.payload.nickname,
    //     content: action.payload.content,
    //     writedTo: action.payload.writedTo,
    //     createdAt: new Date().toString(),
    //   };
    //   console.log(action.payload);
    //   const fanLetterAddedArtists = state.map((artist) => {
    //     if (artist.id === action.payload.currentArtistId) {
    //       return {
    //         ...artist,
    //         fanLetters: [...artist.fanLetters, newFanLetter],
    //       };
    //     }
    //     return artist;
    //   });
    //   console.log(fanLetterAddedArtists);
    //   saveLocalStorage("artists", fanLetterAddedArtists);
    //   return fanLetterAddedArtists;
    // },
    // editFanLetter: (state, action) => {
    //   const fanLetterEditedArtists = state.map((artist) =>
    //     artist.id === action.payload.currentArtistId
    //       ? {
    //           ...artist,
    //           fanLetters: artist.fanLetters.map((letter) =>
    //             letter.id === action.payload.fanLetterId
    //               ? { ...letter, content: action.payload.content }
    //               : letter
    //           ),
    //         }
    //       : artist
    //   );
    //   saveLocalStorage("artists", fanLetterEditedArtists);
    //   return fanLetterEditedArtists;
    // },
    // deleteFanLetter: (state, action) => {
    //   const fanLetterDeletedArtists = state.map((artist) => {
    //     if (artist.id === action.payload.currentArtistId) {
    //       console.log(artist);
    //       return {
    //         ...artist,
    //         fanLetters: artist.fanLetters.filter(
    //           (fanLetter) => fanLetter.id !== action.payload.fanLetterId
    //         ),
    //       };
    //     }
    //     return artist;
    //   });
    //   saveLocalStorage("artists", fanLetterDeletedArtists);
    //   return fanLetterDeletedArtists;
    // },
  },
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
        console.log("action payload", action.payload);
        console.log(state);
        state.artists = state.artists.map((artist) => {
          if (artist.id === action.payload.id) {
            return action.payload;
          }
          return artist;
        });
        // state.artists = action.payload;
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
        console.log("action payload", action.payload);
        console.log(state);
        state.artists = state.artists.map((artist) => {
          if (artist.id === action.payload.id) {
            return action.payload;
          }
          return artist;
        });
        // state.artists = action.payload;
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
        console.log("action payload", action.payload);
        console.log(state);
        state.artists = state.artists.map((artist) => {
          if (artist.id === action.payload.id) {
            return action.payload;
          }
          return artist;
        });
        // state.artists = action.payload;
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
