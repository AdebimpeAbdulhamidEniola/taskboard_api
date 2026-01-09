// src/types/types.ts
import { Request } from "express";

export interface CreateBoardRequestBody {
  name: string;
  description?: string;
}

export interface BoardParams {
  boardId: string;
}

export interface UpdateBoardRequestBody {
  name?: string;
  description?: string;
}

export type CreateBoardRequest = Request<{}, {}, CreateBoardRequestBody>;
export type BoardParamsRequest = Request<BoardParams>;
export type UpdateBoardRequest = Request<BoardParams, {}, UpdateBoardRequestBody>;

// ===== Task types =====
export interface TaskParams {
  taskId: string;
}

export interface UpdateTaskRequestBody {
  name?: string;
  description?: string;
  status?: "IN_PROGRESS" | "COMPLETED" | "WONT_DO";
}

export type TaskParamsRequest = Request<TaskParams>;
export type UpdateTaskRequest = Request<TaskParams, {}, UpdateTaskRequestBody>;
