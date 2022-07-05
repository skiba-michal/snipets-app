import { apiStructure } from "@models";
import { Router } from "express";
import { editUserSettings, getUserProfile } from "./userData.controller";
import { isAuth } from "@middlewares";

const router = Router({ strict: true });

router.get(`/${apiStructure.userData.profile}`, isAuth, getUserProfile);
router.post(`/${apiStructure.userData.settings}`, isAuth, editUserSettings);

export default router;