import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import todoRoutes from "./routes/todo.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch(() => {
        process.exit(1); // code 1 means exit with error. 0 means success
    });

app.listen(3000, () => {
    console.log("server is running on localhost:3000.");
});
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
    res.send("Server is running on localhost:3000. MongoDB Connected");
});
