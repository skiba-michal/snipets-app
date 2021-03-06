import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthRequest, RequestError } from "@models";
import { errorMessages, isJwtPayload } from "@utils";

export const isAuth = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const authorization = req.get("Authorization")?.split(" ");

  if (!authorization || authorization.length < 1) {
    const error: RequestError = new Error(errorMessages.notAuthenticated);
    error.statusCode = 401;
    throw error;
  }

  const token = authorization[1];
  let decodedToken: JwtPayload | string;

  try {
    decodedToken = jwt.verify(token, process.env.HASH_KEY);
  } catch (err) {
    if (err.message === "jwt expired") {
      err.message = errorMessages.tokenExpired;
      err.data = {
        isTokenExpired: true,
      }
    }
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error: RequestError = new Error(errorMessages.notAuthenticated);
    error.statusCode = 401;
    throw error;
  }

  if (isJwtPayload(decodedToken)) {
    req.userId = decodedToken.userId;
    req.userName = decodedToken.userName;
  }
  next();
};
