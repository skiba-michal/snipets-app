import { Router } from "express";
import { body } from "express-validator";
import { validationMessages } from "@utils/messages";
import { login } from "./auth.controller";
import { UserModel } from "./auth.model";
import { signup } from "./auth.controller";

const router = Router();

router.post("/login", login);
router.post(
  "/signup",
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
