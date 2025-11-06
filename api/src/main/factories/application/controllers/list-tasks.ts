import { ListTasksController } from "@/application/controllers/task";
import { setupListTasks } from "@/domain/use-cases";
import { makeSqliteTaskRepository } from "@/main/factories/infra/repos/sqlite/task-repository";

/**
 * Factory function to create a ListTasksController with use case injection
 * @returns ListTasksController instance
 */
export const makeListTasksController = (): ListTasksController => {
    const repository = makeSqliteTaskRepository();
    const listTasks = setupListTasks(repository);
    return new ListTasksController(listTasks);
};

