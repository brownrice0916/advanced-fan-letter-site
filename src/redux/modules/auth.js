import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      return { ...action.payload };
    },
    updateUserInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateProfile: (state, action) => {
      return {
        ...state,
        avatar: action.payload.avatar,
        nickname: action.payload.nickname,
      };
    },
  },
});

export const { setUserInfo, updateProfile } = userSlice.actions;
export default userSlice.reducer;
