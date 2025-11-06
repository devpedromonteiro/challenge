/**
 * Server error class for internal errors
 */
export class ServerError extends Error {
    constructor(error?: Error) {
        super("Server failed. Try again soon");
        this.name = "ServerError";
        this.stack = error?.stack;
    }
}

