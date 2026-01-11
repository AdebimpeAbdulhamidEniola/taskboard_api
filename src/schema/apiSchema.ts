import { z } from 'zod';
import { TaskStatus } from '@prisma/client';

// Task schema with proper Zod v4 error customization
export const taskSchema = z.object({
    name: z.string({
        error: (iss) => {
            if (iss.input === undefined) return "Task name is required";
            return "Task name must be a string";
        }
    })
    .min(3, "Minimum of 3 letters can be used as task name")
    .trim(),

    description: z.string({
        error: (iss) => {
            if (iss.input === undefined) return "Task description is required";
            return "Task description must be a string";
        }
    })
    .min(3, "Minimum of 3 letters can be used as task description")
    .trim()
    .optional()
    .or(z.literal("")),

    status: z.nativeEnum(TaskStatus, {
        error: "Invalid task status. Must be IN_PROGRESS, COMPLETED, or WONT_DO"
    })
})
.strict();

// Board schema with proper Zod v4 error customization
export const boardSchema = z.object({
    name: z.string({
        error: (iss) => {
            if (iss.input === undefined) return "Board name is required";
            return "Board name must be a string";
        }
    })
    .min(3, "Minimum of 3 letters can be used as board name")
    .trim(),

    description: z.string({
        error: (iss) => {
            if (iss.input === undefined) return "Board description is required";
            return "Board description must be a string";
        }
    })
    .min(3, "Minimum of 3 letters can be used as board description")
    .trim()
    .optional()
    .nullable()
    .or(z.literal(""))
})
    .strict();



// Partial schemas for updates (all fields optional)
export const updateTaskSchema = taskSchema.partial();
export const updateBoardSchema = boardSchema.partial();