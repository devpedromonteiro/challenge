import request from "supertest";
import { app } from "@/main/config/app";

describe("GET /tasks/:id - Integration Tests", () => {
    let createdTaskId: number;

    beforeAll(async () => {
        // Create a task for testing
        const response = await request(app).post("/tasks").send({
            title: "Task for load by id test",
            description: "Description for load test",
        });
        createdTaskId = response.body.id;
    });

    describe("Success Cases", () => {
        it("should load a task by id and return 200", async () => {
            const response = await request(app).get(`/tasks/${createdTaskId}`).expect(200);

            expect(response.body).toHaveProperty("id", createdTaskId);
            expect(response.body).toHaveProperty("title", "Task for load by id test");
            expect(response.body).toHaveProperty("description", "Description for load test");
            expect(response.body).toHaveProperty("status", "pending");
            expect(response.body).toHaveProperty("createdAt");
            expect(response.body).toHaveProperty("updatedAt");
        });
    });

    describe("Error Cases", () => {
        it("should return 404 if task does not exist", async () => {
            const response = await request(app).get("/tasks/999999").expect(404);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe("Task not found");
        });
    });
});

