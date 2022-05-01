import { ModuleTypeEnum } from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DrawerData } from "./options.interfaces";

export interface OptionsStotre {
  drawerData: DrawerData;
}

export const optionsData = createSlice({
  name: "options",
  initialState: {
    drawerData: {
      module: null,
    },
  },
  reducers: {
    setDrawerData: (state: OptionsStotre, action: PayloadAction<ModuleTypeEnum>) => {
      state.drawerData.module = action.payload;
    },
  }
});

export type UserStoreData = ReturnType<typeof optionsData.reducer>;
export const { setDrawerData } = optionsData.actions;
