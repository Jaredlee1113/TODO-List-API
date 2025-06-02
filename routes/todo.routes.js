const express = require("express");
const {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodos,
    getTodo,
} = require("../controllers/todo.controller.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
