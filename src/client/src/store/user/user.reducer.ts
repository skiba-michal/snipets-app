import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAccountProfile } from "./user.thunks";

export interface IUserProfile {
  username: string;
  language: string;
}

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    username: "",
    language: "en",
    account: {},
  },
  reducers: {
    setName: (state: IUserProfile, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAccountProfile.fulfilled, (state, action) => {
      state.account = action.payload;
    });
  },
});

export type UserProfileState = ReturnType<typeof userProfileSlice.reducer>;
export const { setName } = userProfileSlice.actions;
