import { AxiosResponse } from "axios";
import { UserDataResponse } from "@models";
import { apiStructure } from "@const"
import { buildAsyncThunk } from "../utils";
import { httpClient } from "@utils";

export const fetchUserProfile = buildAsyncThunk(
  "user/fetchUserProfile",
  async () => {
    const response: AxiosResponse<UserDataResponse> = await httpClient.get(apiStructure.userData.profile);
    return response.data;
  }
);
