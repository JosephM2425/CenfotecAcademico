import { Router } from "express";
import { getMe } from "../controllers/identity.controller.js";

export const identityRouter = Router();

identityRouter.get("/me", getMe);
