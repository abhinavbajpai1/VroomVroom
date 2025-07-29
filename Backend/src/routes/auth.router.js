import { Router } from "express";
import { login, register, getCurrentUser } from "../controllers/auth.controller.js";

const authRouter = Router();

// Authentication routes
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile/me", getCurrentUser);

export default authRouter; 