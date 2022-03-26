import { RequestError } from "@models";
import axios, { AxiosError, AxiosResponse } from "axios";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

httpClient.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    console.log(response, "interceptor");
    console.log(response.statusText, "interceptor");
    return response;
  },
  (error: AxiosError<RequestError>) => {
    const errorParsed = error.toJSON()
 
    console.log('aaaaa')
    console.log(error.response, 'aaaaa')
    return Promise.reject(error);
  }
);

export { httpClient };
