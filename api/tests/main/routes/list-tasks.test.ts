import request from "supertest";
import { app } from "@/main/config/app";

describe("GET /tasks - Integration Tests", () => {
    let createdTaskId: number;

    beforeAll(async () => {
        // Create a task for testing
        const response = await request(app).post("/tasks").send({
            title: "Test task for listing",
            description: "Description for listing test",
        });
        createdTaskId = response.body.id;
    });

    describe("Success Cases", () => {
        it("should list all tasks and return 200", async () => {
            const response = await request(app).get("/tasks").expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty("id");
            expect(response.body[0]).toHaveProperty("title");
            expect(response.body[0]).toHaveProperty("description");
            expect(response.body[0]).toHaveProperty("status");
            expect(response.body[0]).toHaveProperty("createdAt");
            expect(response.body[0]).toHaveProperty("updatedAt");
        });

        it("should filter tasks by status=pending", async () => {
            const response = await request(app).get("/tasks?status=pending").expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            for (const task of response.body) {
                expect(task.status).toBe("pending");
            }
        });

        it("should search tasks by title", async () => {
            const response = await request(app)
                .get("/tasks?search=Test task for listing")
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it("should combine status filter and search", async () => {
            const response = await request(app)
                .get("/tasks?status=pending&search=Test")
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe("Validation Error Cases", () => {
        it("should return 400 if status is invalid", async () => {
            const response = await request(app).get("/tasks?status=invalid").expect(400);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toContain("status");
        });
    });
});

