import type { FilterTasksParams, TaskModel, TaskRepository } from "@/domain/contracts/repos";

type Setup = (taskRepository: TaskRepository) => ListTasks;
type Input = { status?: "pending" | "completed"; search?: string };
type Output = TaskModel[];

export type ListTasks = (input?: Input) => Promise<Output>;

/**
 * Setup function for ListTasks use case
 * @param taskRepository - Task repository instance
 * @returns ListTasks use case function
 */
export const setupListTasks: Setup =
    (taskRepository) =>
    async (input) => {
        const params: FilterTasksParams | undefined = input
            ? {
                  status: input.status,
                  search: input.search,
              }
            : undefined;

        const tasks = await taskRepository.listAll(params);

        return tasks;
    };

