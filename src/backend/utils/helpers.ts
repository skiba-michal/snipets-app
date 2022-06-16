import jwt from "jsonwebtoken";
import { RequestError, UserDataDb } from "@models";
import { errorMessages } from "./messages";
import { UserTokens, ValidationStringOptions } from "@utils";
import { testIsBasicCharacters } from "@const";

export const throwNotFound = () => {
  const error: RequestError = new Error(errorMessages.notFound);
  error.statusCode = 404;
  throw error;
};

export const createUserTokens = (user: UserDataDb, onlyToken = false): UserTokens => {
  const userId = user._id.toString();
  const token = jwt.sign({ login: user.login, userId, userName: user.name }, process.env.HASH_KEY, {
    expiresIn: "2h",
  });
  const refreshToken = onlyToken ? "" : jwt.sign({ userId }, process.env.REFRESH_HASH_KEY, { expiresIn: "1y" });
  return { token, refreshToken, userId };
};

export const validateString = (value: string, options: ValidationStringOptions): boolean => {
  if (!value) {
    return false;
  }
  const length = value.length;
  if (options.maxLenght && length > options.maxLenght) {
    return false;
  }
  if (options.minLenght && length < options.minLenght) {
    return false;
  }
  if (options.basicCharactersOnly && !value.match(testIsBasicCharacters)) {
    return false;
  }
  return true;
}