import { Router } from "express";
import { body } from "express-validator/check";
import { login } from "./auth.controller";
import { validationMessages } from "@utils/errorMessages";
import { UserModel } from "./auth.model";
import { signup } from "./auth.controller";

const router = Router();

router.post("/api/login", login);
router.post(
  "/api/signup",
  [
    body("email")
      .isEmail()
      .withMessage(validationMessages.invalidEmail)
      .custom(async (value: string) => {
        const userDoc = await UserModel.findOne({ email: value });
        if (userDoc) {
          return Promise.reject(validationMessages.emailExist);
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6 }).withMessage(validationMessages.toShortPassword),
    body("name").trim().not().isEmpty().withMessage(validationMessages.isRequired),
  ],
  signup
);

export default router;
