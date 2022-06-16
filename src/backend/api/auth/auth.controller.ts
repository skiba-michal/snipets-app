import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { validationMessages, succesMessages, errorMessages, createUserTokens } from "@utils";
import {
  UserDataDb,
  UserLoginData,
  RequestError,
  RequestResponse,
  ResgisterData,
  UserDataResponse,
  AuthRequest,
  RefreshTokenResponse,
} from "@models";
import { UserModel } from "@schemas";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as UserLoginData;
  const login = body.login;
  const password = body.password;
  let loadedUser: UserDataDb;

  UserModel.findOne({ login })
    .then(user => {
      if (!user) {
        const error: RequestError = new Error(errorMessages.badLoginData);
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;

      bcrypt
        .compare(password, user.password)
        .then(isEqual => {
          if (!isEqual) {
            const error: RequestError = new Error(errorMessages.badLoginData);
            error.statusCode = 401;
            throw error;
          }
          const { token, refreshToken, userId } = createUserTokens(loadedUser);

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 3.154e10, // 1 year
          });

          UserModel.updateOne(
            { _id: userId },
            {
              $set: {
                refreshToken: refreshToken,
              },
            }
          )
            .then(() => {
              const response: RequestResponse<UserDataResponse> = {
                message: succesMessages.logedIn,
                data: {
                  name: loadedUser.name,
                  token: token,
                  permissions: loadedUser.permissions,
                  settings: loadedUser.settings,
                  id: userId,
                },
              };

              res.status(200).json(response);
            })
            .catch(err => {
              if (!err.statusCode) {
                err.statusCode = 500;
              }
              next(err);
            });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: RequestError = new Error(validationMessages.validationFailed);
    error.statusCode = 422;
    error.data = {
      ...error.data,
      errors: errors.array(),
    };
    throw error;
  }

  const body = req.body as ResgisterData;
  const login = body.login;
  const name = body.name;
  const password = body.password;

  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new UserModel({
        login,
        name,
        password: hashedPassword,
      });
      return user.save();
    })
    .then(() => {
      const response: RequestResponse<null> = {
        message: succesMessages.userCreated,
        data: null,
      };
      res.status(201).json(response);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken;
  
  if (!refreshToken) {
    const error: RequestError = new Error(errorMessages.notAuthenticated);
    error.statusCode = 401;
    throw error;
  }

  try {
    jwt.verify(refreshToken, process.env.REFRESH_HASH_KEY);
  } catch (err) {
    if (err.message === "jwt expired") {
      err.message = errorMessages.tokenExpired;
      err.data = {
        isRefreshTokenExpired: true,
      };
    }
    err.statusCode = 500;
    throw err;
  }

  UserModel.findOne({ refreshToken })
    .then(user => {
      if (!user) {
        const error: RequestError = new Error(errorMessages.notAuthenticated);
        error.statusCode = 401;
        throw error;
      }
      const { token } = createUserTokens(user, true);

      const response: RequestResponse<RefreshTokenResponse> = {
        message: "",
        data: {
          token: token,
        },
      };
      res.status(200).json(response);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 403;
      }
      err.message = errorMessages.tokenExpired;
      next(err);
    });
};

export const logout = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.userId;

  UserModel.findOne({ _id: userId }).then(user => {
    if (!user) {
      const error: RequestError = new Error(errorMessages.userNotFound);
      error.statusCode = 401;
      throw error;
    }

    UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          refreshToken: "",
        },
      }
    );
    const response: RequestResponse<null> = {
      message: succesMessages.logedOut,
      data: null,
    };

    res.clearCookie("refreshToken");
    res.status(200).json(response);
  });
};
