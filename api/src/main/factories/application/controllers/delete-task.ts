import { DeleteTaskController } from "@/application/controllers/task";
import { setupDeleteTask } from "@/domain/use-cases";
import { makeSqliteTaskRepository } from "@/main/factories/infra/repos/sqlite/task-repository";

/**
 * Factory function to create a DeleteTaskController with use case injection
 * @returns DeleteTaskController instance
 */
export const makeDeleteTaskController = (): DeleteTaskController => {
    const repository = makeSqliteTaskRepository();
    const deleteTask = setupDeleteTask(repository);
    return new DeleteTaskController(deleteTask);
};

