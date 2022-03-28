import { UserMessage } from "@interfaces";
import { RequestError, RequestResponse } from "@models";
import { Store } from "@store/index";
import { setUserMessage } from "@store/user/user.reducer";
import axios, { AxiosError, AxiosResponse } from "axios";
import { VariantType } from "notistack";
import { loopInterval } from "./helpers";

let store: Store;

const injectStore = (_store: Store) => {
  store = _store;
};

const displayUserMessage = (type: VariantType, message: string) => {
  const messageData: UserMessage = {
    message,
    type,
  };

  store.dispatch(setUserMessage(messageData));
}

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

httpClient.interceptors.response.use(
  (response: AxiosResponse<RequestResponse<unknown>>) => {
    if (response.data?.message) {
      store.dispatch(setUserMessage({
        message: response.data.message,
        type: "success",
      }));
    }
    return response.data;
  },
  (error: AxiosError<RequestError>) => {
    const responseData = error?.response?.data;
    const prefixMessage = responseData?.message || 'Error';
    const isManyErrors = responseData?.data?.length > 1;

    const getMessageAndSendMsg = (index: number) => {
      const msg = `${prefixMessage} - ${responseData.data[index].msg}`
      displayUserMessage('error', msg)
    }

    if (isManyErrors) {
      loopInterval(300, responseData.data.length, getMessageAndSendMsg)
    } else {
      const errorText = responseData?.data[0]?.msg;
      const messageContent = errorText ? `${prefixMessage} - ${errorText}` : "Unhandled error";
      displayUserMessage('error', messageContent)
    }

    return Promise.reject(error);
  }
);

export { httpClient, injectStore };
