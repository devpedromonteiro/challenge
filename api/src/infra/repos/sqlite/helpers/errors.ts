import { CustomError } from "@/domain/custom-error";

/**
 * Error thrown when database connection is not found
 */
export class ConnectionNotFoundError extends CustomError {
    constructor() {
        super("No connection to database found", 500);
        this.name = "ConnectionNotFoundError";
    }
}

