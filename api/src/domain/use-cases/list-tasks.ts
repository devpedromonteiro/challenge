import type { FilterTasksParams, TaskModel, TaskRepository } from "@/domain/contracts/repos";

type Setup = (taskRepository: TaskRepository) => ListTasks;
type Input = {
    status?: "pending" | "completed";
    search?: string;
    userId: number;
};
type Output = TaskModel[];

export type ListTasks = (input: Input) => Promise<Output>;

/**
 * Setup function for ListTasks use case
 * @param taskRepository - Task repository instance
 * @returns ListTasks use case function
 */
export const setupListTasks: Setup =
    (taskRepository) =>
    async ({ status, search, userId }) => {
        const params: FilterTasksParams = {
            status,
            search,
            userId,
        };

        const tasks = await taskRepository.listAll(params);

        return tasks;
    };
