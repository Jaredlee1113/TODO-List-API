import express from "express";
import {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodos,
    getTodo,
} from "../controllers/todo.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
