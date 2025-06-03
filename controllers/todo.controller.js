import Todo from "../models/Todo.js";

export const createTodo = async (req, res) => {
    const { title, description } = req.body;
    try {
        if (!title) return res.status(400).json({ message: "Title is required" });
        const todo = await Todo.create({
            title,
            description,
            user: req.user._id,
        });
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: `Internal server error: + ${error.message}` });
    }
};

export const updateTodo = async (req, res) => {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    const { title, description, completed } = req.body;
    try {
        if (!title) return res.status(400).json({ message: "Title is required" });
        todo.title = title;
        todo.description = description;
        todo.completed = completed;
        todo.updatedAt = Date.now();
        const updatedOne = await todo.save();
        res.status(200).json(updatedOne);
    } catch (error) {
        res.status(500).json({ message: `Internal server error: + ${error.message}` });
    }
};

export const deleteTodo = async (req, res) => {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo deleted successfully" });
};

export const getTodos = async (req, res) => {
    const todos = await Todo.find({ user: req.user._id });
    if (!todos) return res.status(404).json({ message: "No todos found" });
    res.status(200).json(todos);
};

export const getTodo = async (req, res) => {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
};
