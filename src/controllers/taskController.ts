// src/controllers/taskController.ts
import { Response, NextFunction } from "express";
import { handleResponse } from "../general/handleResponse";
import {
  updateTaskService,
  deleteTaskService,
} from "@/model/taskModel";
import {
  TaskParamsRequest,
  UpdateTaskRequest,
} from "../types/types";

// PUT /api/tasks/:taskId
export const updateTask = async (
  req: UpdateTaskRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;
    const { name, description, status } = req.body;

    const task = await updateTaskService(taskId, name, description, status);
    handleResponse(res, 200, "Task updated successfully", task);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tasks/:taskId
export const deleteTask = async (
  req: TaskParamsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;

    const result = await deleteTaskService(taskId);
    handleResponse(res, 200, "Task deleted successfully", result);
  } catch (error) {
    next(error);
  }
};
