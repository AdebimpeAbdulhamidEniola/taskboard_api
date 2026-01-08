import { Prisma } from "@prisma/client";
import { Response } from "express";
import { AppError } from "./customError";

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string
): void => {
  res.status(statusCode).json({
    status: "fail",
    message,
  });
};

export const catchPrismaError = (error: unknown, res: Response): boolean => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;

    if (prismaError.code === "P2002") {
      const field = (prismaError.meta?.target as string[])?.[0] || "field";
      sendErrorResponse(res, 409, `A record with this ${field} already exists`);
      return true;
    }

    if (prismaError.code === "P2025") {
      sendErrorResponse(res, 404, "Record not found");
      return true;
    }

    sendErrorResponse(res, 400, `Database error: ${prismaError.message}`);
    return true;
  }

  return false;
};

export const handleUnexpectedError = (error: unknown, res: Response): void => {
  console.error("Unexpected error:", error);

  res.status(500).json({
    status: "error",
    message: "An unexpected error occurred",
  });
};

export const handleAppError = (error: unknown, res: Response): boolean => {
  if (error instanceof AppError) {
    sendErrorResponse(res, error.statusCode, error.message);
    return true;
  }

  return false;
};

export const handleAllErrors = (error: unknown, res: Response): void => {
  if (handleAppError(error, res)) return;
  if (catchPrismaError(error, res)) return;

  handleUnexpectedError(error, res);
};
