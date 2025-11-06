import { CreateTaskController } from "@/application/controllers/task";
import { setupCreateTask } from "@/domain/use-cases";
import { makeSqliteTaskRepository } from "@/main/factories/infra/repos/sqlite/task-repository";

/**
 * Factory function to create a CreateTaskController with use case injection
 * @returns CreateTaskController instance
 */
export const makeCreateTaskController = (): CreateTaskController => {
    const repository = makeSqliteTaskRepository();
    const createTask = setupCreateTask(repository);
    return new CreateTaskController(createTask);
};

