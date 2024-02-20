import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../axios/authApi";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "common/common";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isSignUp: false,
};

export const __getUser = createAsyncThunk(
  "getUser",
  async (payload, thunkAPI) => {
    try {
      const response = await authApi.get("/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${payload}`,
        },
      });
      const { success, ...user } = response.data;
      return thunkAPI.fulfillWithValue(user);
      //   dispatch(setUserInfo(user));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __signInUser = createAsyncThunk(
  "signInUser",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload);
      const response = await authApi.post("/login", payload);
      console.log(response.data);

      const { success, ...userInfoFromServer } = response.data;
      setLocalStorage("accessToken", response.data.accessToken);
      return thunkAPI.fulfillWithValue(userInfoFromServer);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateProfile = createAsyncThunk(
  "updateProfile",
  async (payload, thunkAPI) => {
    try {
      const response = await authApi.patch("/profile", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getLocalStorage("accessToken")}`,
        },
      });
      console.log(response);

      const { avatar, nickname: updatedNickName } = response.data;

      const profileToUpdate = {
        nickname: updatedNickName,
      };

      if (avatar) {
        profileToUpdate.avatar = avatar;
      }
      return thunkAPI.fulfillWithValue(profileToUpdate);
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state, action) => {
      removeLocalStorage("accessToken");
      return {
        ...state,
        user: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(__getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(__signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__updateProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(__updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.nickname = action.payload.nickname;
        state.user.avatar = state.payload.avatar
          ? action.payload.avatar
          : state.user.avatar;
      })
      .addCase(__updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserInfo, updateProfile, resetUser } = userSlice.actions;
export default userSlice.reducer;
