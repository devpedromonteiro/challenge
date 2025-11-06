import type { TaskModel, TaskRepository } from "@/domain/contracts/repos";
import { TaskNotFoundError } from "@/domain/errors";

type Setup = (taskRepository: TaskRepository) => LoadTaskById;
type Input = { id: number };
type Output = TaskModel;

export type LoadTaskById = (input: Input) => Promise<Output>;

/**
 * Setup function for LoadTaskById use case
 * @param taskRepository - Task repository instance
 * @returns LoadTaskById use case function
 */
export const setupLoadTaskById: Setup =
    (taskRepository) =>
    async ({ id }) => {
        const task = await taskRepository.loadById(id);

        if (!task) {
            throw new TaskNotFoundError();
        }

        return task;
    };

