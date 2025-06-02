const request = require("supertest");
const app = require("../app.js");
require("./setup.js"); // Setup the test environment

let token;
let todoId;

beforeAll(async () => {
    // register a test user
    const res = await request(app).post("/api/auth/register").send({
        email: "test@email.com",
        password: "test",
    });
    expect(res.statusCode).toBe(200);
    token = res.body.token;
});

describe("Todo API Tests", () => {
    it("should create a new todo", async () => {
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
            desciption: "this is a updated description",
        };
        const res = await request(app)
            .put(`/api/todo/${todoId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updateTodoItem);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("title");
        expect(res.body).toHaveProperty("description");
        expect(res.body._id).toBe(todoId);
        expect(res.body.title).toBe(updateTodoItem.title);
        expect(res.body._id).toBe(updateTodoItem.desciption);
    });
    it("should update a specific todo status by ID", async () => {
        const res = await request(app)
            .put(`/api/todo/${todoId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                completed: true,
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.completed).toBe(true);
    });

    it("should delete a specific todo item by ID", async () => {
        const res = await request(app)
            .delete(`/api/todo/${todoId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Todo deleted successfully");
    });
});
