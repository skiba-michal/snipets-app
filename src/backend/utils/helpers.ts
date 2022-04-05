import jwt from "jsonwebtoken";
import { RequestError, UserDataDb } from "@models";
import { errorMessages } from "./messages";
import { UserTokens } from "@utils";

export const throwNotFound = () => {
  const error: RequestError = new Error(errorMessages.notFound);
  error.statusCode = 404;
  throw error;
};

export const createUserTokens = (user: UserDataDb, onlyToken = false): UserTokens => {
  const userId = user._id.toString();
  const token = jwt.sign({ login: user.login, userId }, process.env.HASH_KEY, {
    expiresIn: "30m",
  });
  const refreshToken = onlyToken ? "" : jwt.sign({ userId }, process.env.REFRESH_HASH_KEY, { expiresIn: "1y" });
  return { token, refreshToken, userId };
};
