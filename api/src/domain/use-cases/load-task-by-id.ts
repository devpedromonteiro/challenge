import type { TaskModel, TaskRepository } from "@/domain/contracts/repos";
import { TaskNotFoundError } from "@/domain/errors";

type Setup = (taskRepository: TaskRepository) => LoadTaskById;
type Input = { id: number; userId: number };
type Output = TaskModel;

export type LoadTaskById = (input: Input) => Promise<Output>;

/**
 * Setup function for LoadTaskById use case
 * @param taskRepository - Task repository instance
 * @returns LoadTaskById use case function
 */
export const setupLoadTaskById: Setup =
    (taskRepository) =>
    async ({ id, userId }) => {
        const task = await taskRepository.loadById(id, userId);

        if (!task) {
            throw new TaskNotFoundError();
        }

        return task;
    };

