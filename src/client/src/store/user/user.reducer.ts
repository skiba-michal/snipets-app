import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserMessage } from "@interfaces";
import { fetchAccountProfile } from "./user.thunks";

export interface UserStorData {
  userName: string;
  account: {};
  userMessage: UserMessage;
}

export const userData = createSlice({
  name: "userData",
  initialState: {
    userName: "",
    userMessage: {
      type: null,
      message: null,
    },
    account: {},
  },
  reducers: {
    setUserMessage: (state: UserStorData, action: PayloadAction<UserMessage>) => {
      state.userMessage = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAccountProfile.fulfilled, (state, action) => {
      state.account = action.payload;
    });
  },
});

export type UserStoreData = ReturnType<typeof userData.reducer>;
export const { setUserMessage } = userData.actions;
