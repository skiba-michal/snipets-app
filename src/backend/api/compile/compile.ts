import { apiStructure } from "@models";
import { Router } from "express";
import { compileCode } from "./compile.controller";
import { isAuth } from "@middlewares";

const router = Router({ strict: true });

router.post(`/${apiStructure.compile.compile}`, isAuth, compileCode);

export default router;