import request from "supertest";
import { app } from "@/main/config/app";

describe("POST /tasks - Integration Tests", () => {
    describe("Success Cases", () => {
        it("should create a task and return 201", async () => {
            const response = await request(app)
                .post("/tasks")
                .send({
                    title: "Buy groceries",
                    description: "Milk, eggs, and bread",
                })
                .expect(201);

            expect(response.body).toHaveProperty("id");
            expect(response.body.title).toBe("Buy groceries");
            expect(response.body.description).toBe("Milk, eggs, and bread");
            expect(response.body.status).toBe("pending");
            expect(response.body).toHaveProperty("createdAt");
            expect(response.body).toHaveProperty("updatedAt");
        });

        it("should create a task with special characters", async () => {
            const response = await request(app)
                .post("/tasks")
                .send({
                    title: "José's task",
                    description: "Description with áccents and émojis 🎉",
                })
                .expect(201);

            expect(response.body.title).toBe("José's task");
            expect(response.body.description).toBe("Description with áccents and émojis 🎉");
        });

        it("should create a task with long description", async () => {
            const longDescription = "This is a very long description. ".repeat(50);
            const response = await request(app)
                .post("/tasks")
                .send({
                    title: "Task with long description",
                    description: longDescription,
                })
                .expect(201);

            expect(response.body.description).toBe(longDescription);
        });

        it("should create multiple tasks independently", async () => {
            const response1 = await request(app)
                .post("/tasks")
                .send({
                    title: "Task 1",
                    description: "Description 1",
                })
                .expect(201);

            const response2 = await request(app)
                .post("/tasks")
                .send({
                    title: "Task 2",
                    description: "Description 2",
                })
                .expect(201);

            expect(response1.body.id).not.toBe(response2.body.id);
            expect(response1.body.title).toBe("Task 1");
            expect(response2.body.title).toBe("Task 2");
        });
    });

    describe("Validation Error Cases", () => {
        it("should return 400 if title is missing", async () => {
            const response = await request(app)
                .post("/tasks")
                .send({
                    description: "Some description",
                })
                .expect(400);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toContain("title");
        });

        it("should return 400 if title is empty string", async () => {
            const response = await request(app)
                .post("/tasks")
                .send({
                    title: "",
                    description: "Some description",
                })
                .expect(400);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toContain("title");
        });

        it("should return 400 if description is missing", async () => {
            const response = await request(app)
                .post("/tasks")
                .send({
                    title: "Buy groceries",
                })
                .expect(400);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toContain("description");
        });

        it("should return 400 if description is empty string", async () => {
            const response = await request(app)
                .post("/tasks")
                .send({
                    title: "Buy groceries",
                    description: "",
                })
                .expect(400);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toContain("description");
        });

        it("should return 400 if id is provided", async () => {
            const response = await request(app)
                .post("/tasks")
                .send({
                    title: "Buy groceries",
                    description: "Some description",
                    id: 999,
                })
                .expect(400);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toContain("id");
        });

        it("should return 400 if status is provided", async () => {
            const response = await request(app)
                .post("/tasks")
                .send({
                    title: "Buy groceries",
                    description: "Some description",
                    status: "completed",
                })
                .expect(400);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toContain("status");
        });

        it("should return 400 if createdAt is provided", async () => {
            const response = await request(app)
                .post("/tasks")
                .send({
                    title: "Buy groceries",
                    description: "Some description",
                    createdAt: "2024-01-15T10:00:00.000Z",
                })
                .expect(400);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toContain("createdAt");
        });

        it("should return 400 if updatedAt is provided", async () => {
            const response = await request(app)
                .post("/tasks")
                .send({
                    title: "Buy groceries",
                    description: "Some description",
                    updatedAt: "2024-01-15T10:00:00.000Z",
                })
                .expect(400);

            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toContain("updatedAt");
        });

        it("should return 400 if both title and description are missing", async () => {
            const response = await request(app).post("/tasks").send({}).expect(400);

            expect(response.body).toHaveProperty("error");
        });
    });

    describe("Edge Cases", () => {
        it("should return 400 if Content-Type is not application/json", async () => {
            await request(app)
                .post("/tasks")
                .send("title=Task&description=Description")
                .expect(400);
        });

        it("should handle malformed JSON gracefully", async () => {
            await request(app)
                .post("/tasks")
                .set("Content-Type", "application/json")
                .send("{invalid json")
                .expect(400);
        });

        it("should preserve whitespace in title and description", async () => {
            const response = await request(app)
                .post("/tasks")
                .send({
                    title: "  Task with spaces  ",
                    description: "  Description with spaces  ",
                })
                .expect(201);

            expect(response.body.title).toBe("  Task with spaces  ");
            expect(response.body.description).toBe("  Description with spaces  ");
        });
    });
});

