import { Router } from "express";
import { body } from "express-validator";
import { validationMessages } from "@utils";
import { login } from "./auth.controller";
import { UserModel } from "./auth.model";
import { signup } from "./auth.controller";

const router = Router();

router.post("/login", (req, b, c) => login(req, b, c));
router.post(
  "/signup",
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

export default router;
