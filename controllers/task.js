import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const createNewTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      Message: "Task Created",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTask = async (req, res) => {
  try {
    const userid = req.user._id;

    const mytasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      mytasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Invalid Id", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task Not Found", 404));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};
