import { apiStructure } from "@models";
import { Router } from "express";
import { getUserProfile } from "./userData.controller";
import { isAuth } from "@middlewares";

const router = Router({ strict: true });

router.get(`/${apiStructure.userData.profile}`, isAuth, getUserProfile);

export default router;