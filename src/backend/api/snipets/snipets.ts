import { apiStructure } from "@models";
import { Router } from "express";
import { categoriesCreate, snipetCreate, getSnipptsCategories } from "./snipets.controller";
import { isAuth } from "@middlewares";

const router = Router({ strict: true });

router.post(`/${apiStructure.snipets.snipetsCategories}`, isAuth, categoriesCreate);
router.get(`/${apiStructure.snipets.snipetsCategories}`, isAuth, getSnipptsCategories);
router.post(`/${apiStructure.snipets.snipetsDetails}`, isAuth, snipetCreate);

export default router;