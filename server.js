import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

if (process.env.NODE_ENV !== "test") {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB Connected");
            const port = process.env.PORT || 3000;
            app.listen(port, () => {
                console.log("server is running on localhost:", port);
            });

            app.get("/", (req, res) => {
                res.send("Server is running on localhost:3000. MongoDB Connected");
            });
        })
        .catch(() => {
            process.exit(1); // code 1 means exit with error. 0 means success
        });
}

export default app;
