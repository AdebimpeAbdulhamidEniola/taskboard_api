import express from "express";
import {getBoard, createBoard, updateBoard, deleteBoard} from "../controllers/boardController";
const router = express.Router({caseSensitive: true, strict: true});

router.get("/:board-id",  getBoard);
router.post("/", createBoard);
router.put("/:board-id", updateBoard);
router.delete("/:board-id", deleteBoard);