import { combineReducers } from "@reduxjs/toolkit";
import { optionsData } from "./options/options.reducer";
import { userData } from "./user/user.reducer";

const rootReducer = combineReducers({
  user: userData.reducer,
  options: optionsData.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
