import { z } from 'zod';
import { TaskStatus } from '@prisma/client';

// Task schema with proper validation
export const taskSchema = z.object({
    name: z.string({
        required_error: "Task name is required",
        invalid_type_error: "Task name must be a string"
    })
    .min(3, "Minimum of 3 letters can be used as task name")
    .trim(),

    description: z.string({
        invalid_type_error: "Task description must be a string"
    })
    .min(3, "Minimum of 3 letters can be used as task description")
    .trim()
    .optional()
    .or(z.literal("")),

    status: z.nativeEnum(TaskStatus, {
        errorMap: () => ({ message: "Invalid task status. Must be IN_PROGRESS, COMPLETED, or WONT_DO" })
    })
});

// Board schema with proper validation
export const boardSchema = z.object({
    name: z.string({
        required_error: "Board name is required",
        invalid_type_error: "Board name must be a string"
    })
    .min(3, "Minimum of 3 letters can be used as board name")
    .trim(),

    description: z.string({
        invalid_type_error: "Board description must be a string"
    })
    .min(3, "Minimum of 3 letters can be used as board description")
    .trim()
    .optional()
    .nullable()
    .or(z.literal(""))
});

// Parameter validation schemas
export const boardIdSchema = z.object({
    boardId: z.string({
        required_error: "Board ID is required"
    }).min(1, "Board ID cannot be empty")
});

export const taskIdSchema = z.object({
    taskId: z.string({
        required_error: "Task ID is required"
    }).min(1, "Task ID cannot be empty")
});

// Partial schemas for updates (all fields optional)
export const updateTaskSchema = taskSchema.partial();
export const updateBoardSchema = boardSchema.partial();