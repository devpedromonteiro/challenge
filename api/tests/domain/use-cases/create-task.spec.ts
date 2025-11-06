import { type MockProxy, mock } from "jest-mock-extended";
import type { TaskModel, TaskRepository } from "@/domain/contracts/repos";
import { type CreateTask, setupCreateTask } from "@/domain/use-cases";

describe("CreateTask Use Case", () => {
    let sut: CreateTask;
    let taskRepository: MockProxy<TaskRepository>;
    let fakeTask: TaskModel;

    beforeAll(() => {
        fakeTask = {
            id: 1,
            title: "Buy groceries",
            description: "Milk, eggs, and bread",
            status: "pending",
            createdAt: new Date("2024-01-15T10:00:00.000Z"),
            updatedAt: new Date("2024-01-15T10:00:00.000Z"),
        };
        taskRepository = mock();
        taskRepository.create.mockResolvedValue(fakeTask);
    });

    beforeEach(() => {
        sut = setupCreateTask(taskRepository);
    });

    it("should call repository create with correct params", async () => {
        await sut({ title: "Buy groceries", description: "Milk, eggs, and bread" });

        expect(taskRepository.create).toHaveBeenCalledWith({
            title: "Buy groceries",
            description: "Milk, eggs, and bread",
        });
        expect(taskRepository.create).toHaveBeenCalledTimes(1);
    });

    it("should return created task", async () => {
        const result = await sut({ title: "Buy groceries", description: "Milk, eggs, and bread" });

        expect(result).toEqual(fakeTask);
    });

    it("should create task with status pending by default", async () => {
        const result = await sut({ title: "Buy groceries", description: "Milk, eggs, and bread" });

        expect(result.status).toBe("pending");
    });

    it("should create task with special characters in title", async () => {
        await sut({ title: "José's task", description: "Some description" });

        expect(taskRepository.create).toHaveBeenCalledWith({
            title: "José's task",
            description: "Some description",
        });
    });

    it("should create task with long description", async () => {
        const longDescription = "This is a very long description ".repeat(10);
        await sut({ title: "Task", description: longDescription });

        expect(taskRepository.create).toHaveBeenCalledWith({
            title: "Task",
            description: longDescription,
        });
    });

    it("should rethrow errors from repository", async () => {
        taskRepository.create.mockRejectedValueOnce(new Error("Database error"));

        const promise = sut({ title: "Task", description: "Description" });

        await expect(promise).rejects.toThrow("Database error");
    });

    it("should handle concurrent creations", async () => {
        taskRepository.create.mockResolvedValue(fakeTask);

        const promises = [
            sut({ title: "Task 1", description: "Description 1" }),
            sut({ title: "Task 2", description: "Description 2" }),
            sut({ title: "Task 3", description: "Description 3" }),
        ];

        const results = await Promise.all(promises);

        expect(results).toHaveLength(3);
        expect(taskRepository.create).toHaveBeenCalledTimes(3);
    });
});

