import { RequestError } from "@models";
import { errorMessages } from "./messages";

export const throwNotFound = () => {
  const error: RequestError = new Error(errorMessages.notFound);
  error.statusCode = 404;
  throw error;
};
