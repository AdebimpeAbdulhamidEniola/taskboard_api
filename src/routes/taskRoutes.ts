import express from "express";
import {updateTask, deleteTask} from "../controllers/taskController";

const router = express.Router({caseSensitive: true, strict: true});

router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;