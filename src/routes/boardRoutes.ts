import express from "express";
import { getBoard, createBoard, updateBoard, deleteBoard } from "../controllers/boardController";
import { validateBody } from "@/middleware/validateRequest";
import { boardSchema, updateBoardSchema} from "@/schema/apiSchema";

const router = express.Router({ caseSensitive: true, strict: true });

// GET /api/boards/:boardId - Get a board
router.get("/:boardId", getBoard);

// POST /api/boards - Create a board
router.post("/", validateBody(boardSchema), createBoard);

// PUT /api/boards/:boardId - Update a board
router.put("/:boardId", validateBody(updateBoardSchema), updateBoard);

// DELETE /api/boards/:boardId - Delete a board
router.delete("/:boardId", deleteBoard);


export default router;