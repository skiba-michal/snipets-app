import { UserMessage } from "@interfaces";
import { RequestError, RequestResponse, RefreshTokenResponse} from "@models";
import { apiStructure } from '@const';
import { Store } from "@store/index";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage, VariantType } from "notistack";
import { loopInterval } from "./helpers";
import { getUserToken, removeUserToken, setUserToken } from "@utils";

type SnackbarHandler = (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;

let store: Store;
let snackbar: SnackbarHandler

const injectHttpHandlerData = (_store: Store, _snackbar: SnackbarHandler) => {
  store = _store;
  snackbar = _snackbar;
};

const displayUserMessage = (type: VariantType, message: string) => {
  const messageData: UserMessage = {
    message,
    type,
  };
  if (snackbar) {
    snackbar(messageData.message, { variant: messageData.type });
  }
}

const refreshTokenClient = axios.create({
  baseURL: process.env.REACT_APP_URL,
  withCredentials: true
});

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_URL,
  withCredentials: true
});

httpClient.interceptors.request.use(
	  (config: AxiosRequestConfig) => {
		const token = getUserToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
		return config;
	},
	(error: AxiosError<RequestError>) => {
		switch (error.code) {
			case '401':
				removeUserToken();
				break;
			default:
		}

		return Promise.reject(error);
	}
);

httpClient.interceptors.response.use(
  (response: AxiosResponse<RequestResponse<unknown>>) => {
    if (response.data?.message) {
      displayUserMessage(
        "success",
        response.data.message,
      );
    }
    return response.data;
  },
  async (error: AxiosError<RequestError>) => {
    if (error.message === "canceled") {
      return Promise.reject(error);
    }

    const responseData = error?.response?.data;

    if (responseData.data.isTokenExpired) {
      try {
        const requestRefreshToken: AxiosResponse<RequestResponse<RefreshTokenResponse>> = await refreshTokenClient.get(apiStructure.auth.refreshToken);
        const token = requestRefreshToken?.data?.data?.token;
        setUserToken(token)
        return httpClient.request(error.config);
      } catch (err) {
        displayUserMessage('error', err?.response?.data?.message || "Uknown error")
        return Promise.reject(err);
      }  
    }

    const prefixMessage = responseData?.message || 'Error';
    const isManyErrors = responseData?.data?.errors?.length > 1;
    
    const getMessageAndSendMsg = (index: number) => {
      const msg = `${prefixMessage} - ${responseData.data[index]?.msg || ""}`
      displayUserMessage('error', msg)
    }

    if (isManyErrors) {
      loopInterval(300, responseData.data.errors.length, getMessageAndSendMsg)
    } else {
      const errorText = responseData?.data[0]?.msg;
      const messageContent = errorText ? `${prefixMessage} - ${errorText}` : prefixMessage;
      displayUserMessage('error', messageContent)
    }

    return Promise.reject(error);
  }
);

export { httpClient, injectHttpHandlerData };
