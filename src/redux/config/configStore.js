import { createStore } from "redux";
import { combineReducers } from "redux";
import artistsReducer from "../modules/artistsReducer.js";
const rootReducer = combineReducers({
  artistsReducer,
});

const store = createStore(rootReducer);

export default store;
