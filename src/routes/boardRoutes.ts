import express from "express";
import {getBoard, createBoard, updateBoard, deleteBoard} from "../controllers/boardController";
const router = express.Router({caseSensitive: true, strict: true});

router.get("/:boardId",  getBoard);
router.post("/", createBoard);
router.put("/:boardId", updateBoard);
router.delete("/:boardId", deleteBoard);

export default router;