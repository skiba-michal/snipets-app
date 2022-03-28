import { combineReducers } from "@reduxjs/toolkit";
import { userData } from "./user/user.reducer";

const rootReducer = combineReducers({
  user: userData.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
