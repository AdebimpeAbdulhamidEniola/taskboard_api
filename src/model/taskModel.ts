// src/model/taskModel.ts
import prisma from "@/lib/prisma";
import { NotFoundError } from "@/utils/customError";

// Update an existing task
export const updateTaskService = async (
  taskId: string,
  name?: string,
  description?: string,
  status?: "IN_PROGRESS" | "COMPLETED" | "WONT_DO"
) => {
  const updateData: {
    name?: string;
    description?: string | null;
    status?: "IN_PROGRESS" | "COMPLETED" | "WONT_DO";
  } = {};

  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;

  const task = await prisma.task.update({
    where: { id: taskId },
    data: updateData,
  });

  if (!task) {
    throw new NotFoundError("Task not found");
  }

  return task;
};

// Delete an existing task
export const deleteTaskService = async (taskId: string) => {
  await prisma.task.delete({
    where: { id: taskId },
  });

  return { message: "Task deleted successfully" };
};
