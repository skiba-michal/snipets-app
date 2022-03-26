import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { validationMessages, succesMessages, errorMessages } from "@utils";
import { User, UserLoginData, RequestError } from "@models";
import { UserModel } from "./auth.model";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as UserLoginData;
  const login = body.login;
  const password = body.password;
  let loadedUser: User;
  UserModel.findOne({ login })
    .then(user => {
      if (!user) {
        const error: RequestError = new Error(errorMessages.userNotFound);
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error: RequestError = new Error(errorMessages.wrongPassword);
        error.statusCode = 401;
        throw error;
      }
      const userId = loadedUser._id ? loadedUser._id.toString() : "";
      const token = jwt.sign({ login: loadedUser.login, userId: userId }, process.env.HASH_KEY, { expiresIn: "2h" });
      res.status(200).json({ token, userId });
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
    error.data = errors.array();
    throw error;
  }

  const body = req.body as User;
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
    .then(result => {
      res.status(201).json({ message: succesMessages.userCreated, userData: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
