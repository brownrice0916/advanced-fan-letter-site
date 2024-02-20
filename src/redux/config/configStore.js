import { configureStore } from "@reduxjs/toolkit";
import artists from "../modules/artists.js";
import user from "../modules/auth.js";

const store = configureStore({
  reducer: { artists: artists, user: user },
});

export default store;
