import { Request, Response, NextFunction } from "express";
import { createBoardService,updateBoardService,getBoardByIdService, deleteBoardService } from "@/model/boardModel";
import { handleResponse } from "../general/handleResponse";
import { CreateBoardRequest, BoardParamsRequest, UpdateBoardRequest } from "../types/types";

export const createBoard = async (req: CreateBoardRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    const board = await createBoardService(name, description);
    handleResponse(res, 201, "Board created successfully", board);
  } catch (error) {
    next(error);
  }
};

export const getBoard = async (req: BoardParamsRequest, res: Response, next: NextFunction) => {
  try {
    const { boardId } = req.params;
    const board = await getBoardByIdService(boardId);
    handleResponse(res, 200, "Board retrieved successfully", board);
  } catch (error) {
    next(error);
  }
};

export const updateBoard = async (req: UpdateBoardRequest, res: Response, next: NextFunction) => {
  try {
    const { boardId } = req.params;
    const { name, description } = req.body;
    const board = await updateBoardService(boardId, name, description);
    handleResponse(res, 200, "Board updated successfully", board);
  } catch (error) {
    next(error);
  }
};

export const deleteBoard = async (req: BoardParamsRequest, res: Response, next: NextFunction) => {
  try {
    const { boardId } = req.params;
    const board = await deleteBoardService(boardId);
    handleResponse(res, 200, "Board deleted successfully", board);
  } catch (error) {
    next(error);
  }
};