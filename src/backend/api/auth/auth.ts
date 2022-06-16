import { Router } from "express";
import { body } from "express-validator";
import { validationMessages } from "@utils";
import { UserModel } from "@schemas";
import { apiStructure } from "@models";
import { isAuth } from "@middlewares";
import { login, signup, refreshToken, logout } from "./auth.controller";

const router = Router({ strict: true });

router.post(`/${apiStructure.auth.login}`, login);
router.post(
  `/${apiStructure.auth.signup}`,
  [
    body("login")
      .trim()
      .isLength({ min: 3 })
      .withMessage(validationMessages.toShortLogin)
      .custom(async (value: string) => {
        const userDoc = await UserModel.findOne({ login: value });
        if (userDoc) {
          return Promise.reject(validationMessages.loginExist);
        }
      }),
    body("password").trim().isLength({ min: 6 }).withMessage(validationMessages.toShortPassword),
    body("name").trim().not().isEmpty().withMessage(validationMessages.isRequired),
    body("secretKey").custom(async (value: string) => {
      if (value !== process.env.SECRET_KEY) {
        return Promise.reject(validationMessages.secretKeyIsInvalid);
      }
    }),
  ],
  signup
);
router.get(`/${apiStructure.auth.refreshToken}`, refreshToken);
router.post(`/${apiStructure.auth.logout}`, isAuth, logout);

export default router;
