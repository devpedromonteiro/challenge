import request from "supertest";
import { app } from "@/main/config/app";

describe("PUT /tasks/:id - Integration Tests", () => {
    let createdTaskId: number;

    beforeEach(async () => {
        // Create a task for each test
        const response = await request(app).post("/tasks").send({
            title: "Task to update",
            description: "Original description",
        });
        createdTaskId = response.body.id;
    });

    describe("Success Cases", () => {
        it("should update task title and return 204", async () => {
            await request(app)
                .put(`/tasks/${createdTaskId}`)
                .send({
                    title: "Updated title",
                })
                .expect(204);

            // Verify the update
            const response = await request(app).get(`/tasks/${createdTaskId}`);
            expect(response.body.title).toBe("Updated title");
            expect(response.body.description).toBe("Original description");
        });

        it("should update task description and return 204", async () => {
            await request(app)
                .put(`/tasks/${createdTaskId}`)
                .send({
                    description: "Updated description",
                })
                .expect(204);

            const response = await request(app).get(`/tasks/${createdTaskId}`);
            expect(response.body.description).toBe("Updated description");
        });

        it("should update task status and return 204", async () => {
            await request(app)
                .put(`/tasks/${createdTaskId}`)
                .send({
                    status: "completed",
                })
                .expect(204);

            const response = await request(app).get(`/tasks/${createdTaskId}`);
            expect(response.body.status).toBe("completed");
        });

        it("should update all fields at once", async () => {
            await request(app)
                .put(`/tasks/${createdTaskId}`)
                .send({
                    title: "New title",
                    description: "New description",
                    status: "completed",
                })
                .expect(204);

            const response = await request(app).get(`/tasks/${createdTaskId}`);
            expect(response.body.title).toBe("New title");
            expect(response.body.description).toBe("New description");
            expect(response.body.status).toBe("completed");
        });
    });

    describe("Error Cases", () => {
        it("should return 404 if task does not exist", async () => {
            const response = await request(app)
                .put("/tasks/999999")
                .send({
                    title: "Updated title",
                })
                .expect(404);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe("Task not found");
        });

        it("should return 400 if status is invalid", async () => {
            const response = await request(app)
                .put(`/tasks/${createdTaskId}`)
                .send({
                    status: "invalid_status",
                })
                .expect(400);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toContain("status");
        });
    });
});

