import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserMessage } from "@interfaces";
import { fetchAccountProfile } from "./user.thunks";
import { UserDataResponse } from "@models";

export interface UserStore {
  userData: UserDataResponse;
  userMessage: UserMessage;
  account: {}; // to del
}

export const userData = createSlice({
  name: "userData",
  initialState: {
    userData: {
      id: "",
      name: "",
      permissions: [],
      settings: {
        showOnlyMyData: false,
      },
    },
    userMessage: {
      type: null,
      message: null,
    },
    account: {}, // to del
  },
  reducers: {
    setUserMessage: (state: UserStore, action: PayloadAction<UserMessage>) => {
      state.userMessage = action.payload;
    },
    setUserData: (state: UserStore, action: PayloadAction<UserDataResponse>) => {
      const data = action.payload;
      delete data.token;
      state.userData = data;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAccountProfile.fulfilled, (state, action) => {
      // to del
      state.account = action.payload;
    });
  },
});

export type UserStoreData = ReturnType<typeof userData.reducer>;
export const { setUserMessage, setUserData } = userData.actions;
