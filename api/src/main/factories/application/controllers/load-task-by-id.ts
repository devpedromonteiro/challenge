import { LoadTaskByIdController } from "@/application/controllers/task";
import { setupLoadTaskById } from "@/domain/use-cases";
import { makeSqliteTaskRepository } from "@/main/factories/infra/repos/sqlite/task-repository";

/**
 * Factory function to create a LoadTaskByIdController with use case injection
 * @returns LoadTaskByIdController instance
 */
export const makeLoadTaskByIdController = (): LoadTaskByIdController => {
    const repository = makeSqliteTaskRepository();
    const loadTaskById = setupLoadTaskById(repository);
    return new LoadTaskByIdController(loadTaskById);
};

