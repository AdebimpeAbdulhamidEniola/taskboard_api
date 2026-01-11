import express from "express";
import {getBoard, createBoard, updateBoard, deleteBoard} from "../controllers/boardController";


import { validateBody, validateParams } from "@/middleware/validateRequest";
import { boardSchema, updateBoardSchema, boardIdSchema } from "@/schema/apiSchema";
const router = express.Router({caseSensitive: true, strict: true});

router.get("/:boardId", validateParams(boardIdSchema), getBoard);
router.post("/",validateBody(boardSchema), createBoard);
router.put("/:boardId", validateParams(boardIdSchema), validateBody(updateBoardSchema), updateBoard);
router.delete("/:boardId", validateParams(boardIdSchema), deleteBoard);

export default router;