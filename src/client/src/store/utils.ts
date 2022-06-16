import { RequestError } from "@models";
import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const buildAsyncThunk = <T>(actionType: string, callback: AsyncThunkPayloadCreator<any, T>) => {
  return createAsyncThunk(actionType, async (data: T, store,) => {
    try {
      const result = await callback(data, store);
      return result;
    } catch (err) {
      let error: AxiosError<RequestError> = err;
      return store.rejectWithValue(error.response?.data);
    }
  }, {});
};

