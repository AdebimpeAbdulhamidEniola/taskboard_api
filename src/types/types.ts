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
