import type { CreateTaskParams, TaskModel, TaskRepository } from "@/domain/contracts/repos";

type Setup = (taskRepository: TaskRepository) => CreateTask;
type Input = { title: string; description: string };
type Output = TaskModel;

export type CreateTask = (input: Input) => Promise<Output>;

/**
 * Setup function for CreateTask use case
 * @param taskRepository - Task repository instance
 * @returns CreateTask use case function
 */
export const setupCreateTask: Setup =
    (taskRepository) =>
    async ({ title, description }) => {
        const params: CreateTaskParams = {
            title,
            description,
        };

        const task = await taskRepository.create(params);

        return task;
    };

