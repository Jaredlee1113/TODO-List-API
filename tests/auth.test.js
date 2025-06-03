import request from "supertest";
import app from "../server.js";
import { describe, it, expect } from "vitest";
import "./setup.js"; // Setup the test environment

describe("Auth API Tests", () => {
    let token;

    it("should register a new user", async () => {
        const res = await request(app).post("/api/auth/register").send({
            email: "testAccount@example.com",
            password: "testAccount",
            username: "testAccount",
        });
        expect(res.statusCode).toBe(200);

        expect(res.body).toHaveProperty("token");
        token = res.body.token;
    });

    it("should login the test user and return token", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: "testAccount@example.com",
            password: "testAccount",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body.token).toBe(token);
    });

    it("should not login with invalid credentials", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: "wrong@gmail.com",
            password: "wrongPassword",
        });
        expect(res.statusCode).toBe(400);
    });
});
