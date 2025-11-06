import { UpdateTaskController } from "@/application/controllers/task";
import { setupUpdateTask } from "@/domain/use-cases";
import { makeSqliteTaskRepository } from "@/main/factories/infra/repos/sqlite/task-repository";

/**
 * Factory function to create a UpdateTaskController with use case injection
 * @returns UpdateTaskController instance
 */
export const makeUpdateTaskController = (): UpdateTaskController => {
    const repository = makeSqliteTaskRepository();
    const updateTask = setupUpdateTask(repository);
    return new UpdateTaskController(updateTask);
};

