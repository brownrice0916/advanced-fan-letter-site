import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, saveLocalStorage } from "common/common";
import { v4 as uuidv4 } from "uuid";

const { datas } = require("shared/artists");

const initialState = getLocalStorage("artists")
  ? JSON.parse(getLocalStorage("artists"))
  : datas;

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    addFanLetter: (state, action) => {
      const newFanLetter = {
        id: uuidv4(),
        nickname: action.payload.nickname,
        content: action.payload.content,
        writedTo: action.payload.writedTo,
        createdAt: new Date().toString(),
      };
      console.log(action.payload);
      const fanLetterAddedArtists = state.map((artist) => {
        if (artist.id === action.payload.currentArtistId) {
          return {
            ...artist,
            fanLetters: [...artist.fanLetters, newFanLetter],
          };
        }

        return artist;
      });
      console.log(fanLetterAddedArtists);

      saveLocalStorage("artists", fanLetterAddedArtists);

      return fanLetterAddedArtists;
    },
    editFanLetter: (state, action) => {
      const fanLetterEditedArtists = state.map((artist) =>
        artist.id === action.payload.currentArtistId
          ? {
              ...artist,
              fanLetters: artist.fanLetters.map((letter) =>
                letter.id === action.payload.fanLetterId
                  ? { ...letter, content: action.payload.content }
                  : letter
              ),
            }
          : artist
      );

      saveLocalStorage("artists", fanLetterEditedArtists);
      return fanLetterEditedArtists;
    },
    deleteFanLetter: (state, action) => {
      const fanLetterDeletedArtists = state.map((artist) => {
        if (artist.id === action.payload.currentArtistId) {
          console.log(artist);
          return {
            ...artist,
            fanLetters: artist.fanLetters.filter(
              (fanLetter) => fanLetter.id !== action.payload.fanLetterId
            ),
          };
        }
        return artist;
      });
      saveLocalStorage("artists", fanLetterDeletedArtists);

      return fanLetterDeletedArtists;
    },
  },
});

export const { addFanLetter, editFanLetter, deleteFanLetter } =
  artistsSlice.actions;
export default artistsSlice.reducer;
