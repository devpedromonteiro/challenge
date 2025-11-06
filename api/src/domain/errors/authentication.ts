import { CustomError } from "@/domain/custom-error";

/**
 * Error thrown when authentication fails
 */
export class AuthenticationError extends CustomError {
    constructor() {
        super("Authentication failed", 401);
        this.name = "AuthenticationError";
    }
}

/**
 * Error thrown when email is already in use
 */
export class EmailInUseError extends CustomError {
    constructor() {
        super("Email already in use", 400);
        this.name = "EmailInUseError";
    }
}

/**
 * Error thrown when access is forbidden
 */
export class ForbiddenError extends CustomError {
    constructor() {
        super("Access forbidden", 403);
        this.name = "ForbiddenError";
    }
}

