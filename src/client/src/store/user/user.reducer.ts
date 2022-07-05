import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserProfile } from "./user.thunks";
import { UserData, UserSettings } from "@models";
import { UserStatusEnum } from "@interfaces";

export interface UserStore {
  userData: UserData;
  isUserDataPending: boolean;
  userStatus: UserStatusEnum;
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
        showSnippets: true,
        showScience: true,
        showProjectSnippets: true,
        showInterviewQuestions: true,
        showLanguages: true,
        showCompilators: true,
        showGenerators: true,
      },
    },
    isUserDataPending: false,
    userStatus: UserStatusEnum.UNCONFIRMED,
  },
  reducers: {
    setUserData: (state: UserStore, action: PayloadAction<UserData>) => {
      const data = action.payload;
      state.userData = data;
      state.userStatus = UserStatusEnum.CONFIRMED;
      state.isUserDataPending = false;
    },
    setUserStatus: (state: UserStore, action: PayloadAction<UserStatusEnum>) => {
      state.userStatus = action.payload;
    },
    setUserSettings: (state: UserStore, action: PayloadAction<UserSettings>) => {
      state.userData.settings = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      const data = action.payload;
      delete data.token;
      state.userData = action.payload;
      state.userStatus = UserStatusEnum.CONFIRMED;
      state.isUserDataPending = false;
    });

    builder.addCase(fetchUserProfile.pending, state => {
      state.isUserDataPending = true;
    });

    builder.addCase(fetchUserProfile.rejected, state => {
      state.isUserDataPending = false;
      state.userStatus = UserStatusEnum.REJECTED;
    });
  },
});

export type UserStoreData = ReturnType<typeof userData.reducer>;
export const { setUserData, setUserStatus, setUserSettings } = userData.actions;
