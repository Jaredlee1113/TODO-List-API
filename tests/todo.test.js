import request from "supertest";
import app from "../server.js";
import { beforeAll, describe, it, expect } from "vitest";
import "./setup.js"; // Setup the test environment

let token;
let todoId;

beforeAll(async () => {
    const res = await request(app).post("/api/auth/register").send({
        email: "test@email.com",
        password: "test",
        username: "test",
    });
    expect(res.statusCode).toBe(200);
    token = res.body.user.token;
});

describe("Todo API Tests", () => {
    it("should create a new todo", async () => {
        console.log("Creating a new todo with token:", token);
        const res = await request(app)
            .post("/api/todos")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Test Todo",
                description: "This is a test todo item",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("_id");
        todoId = res.body._id;
    });

    it("should get all todos", async () => {
        const res = await request(app).get("/api/todos").set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should get a specific todo item by ID", async () => {
        const res = await request(app)
            .get(`/api/todos/${todoId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("_id");
        expect(res.body._id).toBe(todoId);
    });

    it("should update a specific todo title and description by ID", async () => {
        const updateTodoItem = {
            title: "test updated title",
            description: "this is a updated description",
        };
        const res = await request(app)
            .put(`/api/todos/${todoId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updateTodoItem);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("title");
        expect(res.body).toHaveProperty("description");
        expect(res.body.title).toBe(updateTodoItem.title);
        expect(res.body.description).toBe(updateTodoItem.description);
    });
    it("should update a specific todo status by ID", async () => {
        const res = await request(app)
            .put(`/api/todos/${todoId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "test updated title",
                completed: true,
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.completed).toBe(true);
    });

    it("should delete a specific todo item by ID", async () => {
        const res = await request(app)
            .delete(`/api/todos/${todoId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Todo deleted successfully");
    });
});
