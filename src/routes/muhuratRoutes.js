import { Router } from "express";
import { getMarriageMuhurat } from "../controllers/muhuratController.js";

const router = Router();

router.get("/marriage", getMarriageMuhurat);

export default router;
