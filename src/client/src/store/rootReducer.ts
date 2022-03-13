import { combineReducers } from "@reduxjs/toolkit";
import { userProfileSlice } from "./user/user.reducer";

const rootReducer = combineReducers({
  user: userProfileSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
