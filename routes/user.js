import express from "express";
import {
  createNewUser,
  getAllUsers,
  getUserByID,
} from "../controllers/user.js";

const router = express.Router();

router.get("/users/all", getAllUsers);

router.get("/userid/:id", getUserByID);

router.post("/users/new", createNewUser);

export default router;
