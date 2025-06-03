import mongoose from "mongoose";
import dotenv from "dotenv";
import { beforeAll, afterAll } from "vitest";

dotenv.config();

beforeAll(async () => {
    console.log("Setting up test environment...", mongoose.connection.readyState);
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log("MongoDB connected for testing");
    }
});

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        const collections = mongoose.connection.collections;
        console.log("Clearing test MongoDB collections...");
        await Promise.all(
            Object.values(collections).map((collection) => collection.deleteMany({}))
        );
        console.log("Test MongoDB collections cleared");
        // await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    }
});
