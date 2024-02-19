import { configureStore } from "@reduxjs/toolkit";
import artists from "../modules/artists.js";

const store = configureStore({
  reducer: { artists: artists },
});

export default store;
