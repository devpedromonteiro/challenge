import type { TaskRepository, UpdateTaskParams } from "@/domain/contracts/repos";
import { TaskNotFoundError } from "@/domain/errors";

type Setup = (taskRepository: TaskRepository) => UpdateTask;
type Input = {
    id: number;
    title?: string;
    description?: string;
    status?: "pending" | "completed";
};

export type UpdateTask = (input: Input) => Promise<void>;

/**
 * Setup function for UpdateTask use case
 * @param taskRepository - Task repository instance
 * @returns UpdateTask use case function
 */
export const setupUpdateTask: Setup =
    (taskRepository) =>
    async ({ id, title, description, status }) => {
        const task = await taskRepository.loadById(id);

        if (!task) {
            throw new TaskNotFoundError();
        }

        const params: UpdateTaskParams = {
            title,
            description,
            status,
        };

        await taskRepository.update(id, params);
    };

