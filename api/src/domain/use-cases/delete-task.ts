import type { TaskRepository } from "@/domain/contracts/repos";
import { TaskNotFoundError } from "@/domain/errors";

type Setup = (taskRepository: TaskRepository) => DeleteTask;
type Input = { id: number; userId: number };

export type DeleteTask = (input: Input) => Promise<void>;

/**
 * Setup function for DeleteTask use case
 * @param taskRepository - Task repository instance
 * @returns DeleteTask use case function
 */
export const setupDeleteTask: Setup =
    (taskRepository) =>
    async ({ id, userId }) => {
        const task = await taskRepository.loadById(id, userId);

        if (!task) {
            throw new TaskNotFoundError();
        }

        await taskRepository.deleteById(id, userId);
    };
