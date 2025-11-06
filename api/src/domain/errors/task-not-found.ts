import { CustomError } from "@/domain/custom-error";

/**
 * Error thrown when a task is not found
 */
export class TaskNotFoundError extends CustomError {
    constructor() {
        super("Task not found", 404);
        this.name = "TaskNotFoundError";
    }
}

