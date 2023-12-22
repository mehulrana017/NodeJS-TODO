import express from "express";
import {
  createNewTask,
  deleteTask,
  getAllTask,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = new express.Router();

router.post("/new", isAuthenticated, createNewTask);
router.get("/mytask", isAuthenticated, getAllTask);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
