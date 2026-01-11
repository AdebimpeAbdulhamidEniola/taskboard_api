// src/middleware/validateRequest.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { BadRequestError } from '@/utils/customError';

export const validateBody = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = schema.parse(req.body);
            req.body = validated; // Replace with validated data
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const messages = error.issues.map(issue => issue.message);
                next(new BadRequestError(messages.join(', ')));
            } else {
                next(error);
            }
        }
    };
};