/**
 * Task model interface
 */
export interface TaskModel {
    id: number;
    title: string;
    description: string;
    status: "pending" | "completed";
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Parameters for creating a task
 */
export interface CreateTaskParams {
    title: string;
    description: string;
}

/**
 * Parameters for updating a task
 */
export interface UpdateTaskParams {
    title?: string;
    description?: string;
    status?: "pending" | "completed";
}

/**
 * Parameters for filtering tasks
 */
export interface FilterTasksParams {
    status?: "pending" | "completed";
    search?: string;
}

/**
 * Task repository contract
 */
export interface TaskRepository {
    /**
     * Creates a new task
     * @param params - Task creation parameters
     * @returns Promise that resolves to the created task
     */
    create(params: CreateTaskParams): Promise<TaskModel>;

    /**
     * Loads a task by ID
     * @param id - Task ID
     * @returns Promise that resolves to the task or null if not found
     */
    loadById(id: number): Promise<TaskModel | null>;

    /**
     * Lists all tasks with optional filters
     * @param params - Filter parameters
     * @returns Promise that resolves to an array of tasks
     */
    listAll(params?: FilterTasksParams): Promise<TaskModel[]>;

    /**
     * Updates a task
     * @param id - Task ID
     * @param params - Update parameters
     * @returns Promise that resolves when update is complete
     */
    update(id: number, params: UpdateTaskParams): Promise<void>;

    /**
     * Deletes a task by ID
     * @param id - Task ID
     * @returns Promise that resolves when deletion is complete
     */
    deleteById(id: number): Promise<void>;
}

