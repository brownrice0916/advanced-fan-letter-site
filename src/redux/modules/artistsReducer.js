import { getLocalStorage, saveLocalStorage } from "common/common";
import { v4 as uuidv4 } from "uuid";

const { datas } = require("shared/artists");

const ADD_FAN_LETTER = "ADD_FAN_LETTER";
const EDIT_FAN_LETTER = "EDIT_FAN_LETTER";
const DELETE_FAN_LETTER = "DELETE_FAN_LETTER";

export const addFanLetter = (currentArtistId, nickname, content, writedTo) => {
  return {
    type: ADD_FAN_LETTER,
    payload: { currentArtistId, nickname, content, writedTo },
  };
};

export const editFanLetter = (currentArtistId, fanLetterId, content) => {
  return {
    type: EDIT_FAN_LETTER,
    payload: { currentArtistId, fanLetterId, content },
  };
};

export const deleteFanLetter = (currentArtistId, fanLetterId) => {
  return {
    type: DELETE_FAN_LETTER,
    payload: { currentArtistId, fanLetterId },
  };
};

const artists = getLocalStorage("artists")
  ? JSON.parse(getLocalStorage("artists"))
  : datas;

const artistsReducer = (state = artists, action) => {
  switch (action.type) {
    case ADD_FAN_LETTER:
      const newFanLetter = {
        id: uuidv4(),
        nickname: action.payload.nickname,
        content: action.payload.content,
        writedTo: action.payload.writedTo,
        createdAt: new Date(),
      };
      const fanLetterAddedArtists = state.map((artist) => {
        if (artist.id === action.payload.currentArtistId) {
          return {
            ...artist,
            fanLetters: [...artist.fanLetters, newFanLetter],
          };
        }

        return artist;
      });

      saveLocalStorage("artists", fanLetterAddedArtists);

      return fanLetterAddedArtists;

    case EDIT_FAN_LETTER:
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

    case DELETE_FAN_LETTER:
      const fanLetterDeletedArtists = artists.map((artist) => {
        //console.log(artist, currentArtist);
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
    default:
      return state;
  }
};

export default artistsReducer;
