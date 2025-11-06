import request from "supertest";
import { app } from "@/main/config/app";

describe("DELETE /tasks/:id - Integration Tests", () => {
    let createdTaskId: number;

    beforeEach(async () => {
        // Create a task for each test
        const response = await request(app).post("/tasks").send({
            title: "Task to delete",
            description: "This task will be deleted",
        });
        createdTaskId = response.body.id;
    });

    describe("Success Cases", () => {
        it("should delete a task and return 204", async () => {
            await request(app).delete(`/tasks/${createdTaskId}`).expect(204);

            // Verify the task was deleted
            await request(app).get(`/tasks/${createdTaskId}`).expect(404);
        });

        it("should delete multiple tasks independently", async () => {
            // Create another task
            const response = await request(app).post("/tasks").send({
                title: "Another task to delete",
                description: "Another description",
            });
            const secondTaskId = response.body.id;

            // Delete first task
            await request(app).delete(`/tasks/${createdTaskId}`).expect(204);

            // Second task should still exist
            const secondTaskResponse = await request(app).get(`/tasks/${secondTaskId}`);
            expect(secondTaskResponse.status).toBe(200);

            // Delete second task
            await request(app).delete(`/tasks/${secondTaskId}`).expect(204);
        });
    });

    describe("Error Cases", () => {
        it("should return 404 if task does not exist", async () => {
            const response = await request(app).delete("/tasks/999999").expect(404);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe("Task not found");
        });

        it("should return 404 when trying to delete the same task twice", async () => {
            await request(app).delete(`/tasks/${createdTaskId}`).expect(204);

            // Try to delete again
            const response = await request(app).delete(`/tasks/${createdTaskId}`).expect(404);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe("Task not found");
        });
    });
});

