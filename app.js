import express from "express";
import mongoose from "Mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("MongoDB Connect error:", err);
        process.exit(1); // code 1 means exit with error. 0 means success
    });

app.listen(3000, () => {
    console.log("server is ruuning on localhost:3000.");
});

app.get("/", (req, res) => {
    res.send("Server is running on localhost:3000. MongoDB Connected");
});
