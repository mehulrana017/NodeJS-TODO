import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.get("/me", isAuthenticated, getMyProfile);

router.get("/logout", logout);
router.post("/register", register);
router.post("/login", login);

export default router;
