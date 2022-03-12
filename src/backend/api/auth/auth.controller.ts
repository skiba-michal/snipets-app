import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator/check";
import { UserLoginData } from "./auth.interface";
import { validationMessages } from "@utils/errorMessages";
import { RequestError } from "@utils/interfaces";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as UserLoginData;
  const login = body.login;
  const password = body.password;
};

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: RequestError = new Error(validationMessages.validationFailed);
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const body = req.body as UserLoginData;
  const email = req.body.email;
};
