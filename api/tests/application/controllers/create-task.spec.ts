import { Controller } from "@/application/controllers";
import { CreateTaskController } from "@/application/controllers/task";
import { ValidationError } from "@/application/errors";

describe("CreateTaskController", () => {
    let sut: CreateTaskController;
    let createTask: jest.Mock;

    beforeAll(() => {
        createTask = jest.fn();
        createTask.mockResolvedValue({
            id: 1,
            title: "Buy groceries",
            description: "Milk, eggs, and bread",
            status: "pending",
            createdAt: new Date("2024-01-15T10:00:00.000Z"),
            updatedAt: new Date("2024-01-15T10:00:00.000Z"),
        });
    });

    beforeEach(() => {
        sut = new CreateTaskController(createTask);
    });

    it("should extend Controller", () => {
        expect(sut).toBeInstanceOf(Controller);
    });

    describe("buildValidators", () => {
        it("should return error if title is missing", async () => {
            const httpRequest = { description: "Some description" };

            const httpResponse = await sut.handle(httpRequest);

            expect(httpResponse.statusCode).toBe(400);
            expect(httpResponse.data).toBeInstanceOf(Error);
        });

        it("should return error if title is empty string", async () => {
            const httpRequest = { title: "", description: "Some description" };

            const httpResponse = await sut.handle(httpRequest);

            expect(httpResponse.statusCode).toBe(400);
            expect(httpResponse.data).toBeInstanceOf(Error);
        });

        it("should return error if description is missing", async () => {
            const httpRequest = { title: "Buy groceries" };

            const httpResponse = await sut.handle(httpRequest);

            expect(httpResponse.statusCode).toBe(400);
            expect(httpResponse.data).toBeInstanceOf(Error);
        });

        it("should return error if description is empty string", async () => {
            const httpRequest = { title: "Buy groceries", description: "" };

            const httpResponse = await sut.handle(httpRequest);

            expect(httpResponse.statusCode).toBe(400);
            expect(httpResponse.data).toBeInstanceOf(Error);
        });

        it("should return error if id is provided", async () => {
            const httpRequest = {
                title: "Buy groceries",
                description: "Some description",
                id: 999,
            };

            const httpResponse = await sut.handle(httpRequest);

            expect(httpResponse.statusCode).toBe(400);
            expect(httpResponse.data).toBeInstanceOf(ValidationError);
            expect(httpResponse.data.message).toContain("id should not be provided");
        });

        it("should return error if status is provided", async () => {
            const httpRequest = {
                title: "Buy groceries",
                description: "Some description",
                status: "completed",
            };

            const httpResponse = await sut.handle(httpRequest);

            expect(httpResponse.statusCode).toBe(400);
            expect(httpResponse.data).toBeInstanceOf(ValidationError);
            expect(httpResponse.data.message).toContain("status should not be provided");
        });

        it("should return error if createdAt is provided", async () => {
            const httpRequest = {
                title: "Buy groceries",
                description: "Some description",
                createdAt: "2024-01-15T10:00:00.000Z",
            };

            const httpResponse = await sut.handle(httpRequest);

            expect(httpResponse.statusCode).toBe(400);
            expect(httpResponse.data).toBeInstanceOf(ValidationError);
            expect(httpResponse.data.message).toContain("createdAt should not be provided");
        });

        it("should return error if updatedAt is provided", async () => {
            const httpRequest = {
                title: "Buy groceries",
                description: "Some description",
                updatedAt: "2024-01-15T10:00:00.000Z",
            };

            const httpResponse = await sut.handle(httpRequest);

            expect(httpResponse.statusCode).toBe(400);
            expect(httpResponse.data).toBeInstanceOf(ValidationError);
            expect(httpResponse.data.message).toContain("updatedAt should not be provided");
        });
    });

    describe("perform", () => {
        it("should call CreateTask use case with correct params", async () => {
            const httpRequest = { title: "Buy groceries", description: "Milk, eggs, and bread" };

            await sut.handle(httpRequest);

            expect(createTask).toHaveBeenCalledWith({
                title: "Buy groceries",
                description: "Milk, eggs, and bread",
            });
            expect(createTask).toHaveBeenCalledTimes(1);
        });

        it("should return 201 with created task", async () => {
            const httpRequest = { title: "Buy groceries", description: "Milk, eggs, and bread" };

            const httpResponse = await sut.handle(httpRequest);

            expect(httpResponse.statusCode).toBe(201);
            expect(httpResponse.data).toEqual({
                id: 1,
                title: "Buy groceries",
                description: "Milk, eggs, and bread",
                status: "pending",
                createdAt: new Date("2024-01-15T10:00:00.000Z"),
                updatedAt: new Date("2024-01-15T10:00:00.000Z"),
            });
        });

        it("should work with special characters", async () => {
            createTask.mockResolvedValueOnce({
                id: 2,
                title: "José's task",
                description: "Description with áccents",
                status: "pending",
                createdAt: new Date("2024-01-15T10:00:00.000Z"),
                updatedAt: new Date("2024-01-15T10:00:00.000Z"),
            });

            const httpRequest = {
                title: "José's task",
                description: "Description with áccents",
            };

            const httpResponse = await sut.handle(httpRequest);

            expect(httpResponse.statusCode).toBe(201);
            expect(httpResponse.data.title).toBe("José's task");
        });

        it("should return 500 if use case throws", async () => {
            createTask.mockRejectedValueOnce(new Error("Database error"));

            const httpRequest = { title: "Buy groceries", description: "Some description" };

            const httpResponse = await sut.handle(httpRequest);

            expect(httpResponse.statusCode).toBe(500);
            expect(httpResponse.data).toBeInstanceOf(Error);
        });
    });
});

