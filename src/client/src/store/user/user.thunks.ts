import { AxiosInstance, AxiosResponse } from "axios";
import { buildAsyncThunk } from "../utils";

export const fetchAccountProfile = buildAsyncThunk(
  "user/fetchAccountProfile",
  async (httpClient: AxiosInstance, store) => {
    const response: AxiosResponse<any> = await httpClient.get(`some url`);
    // store.dispatch(fetchSubaccounts());
    return response.data;
  }
);
