/**
 * Required field error class
 */
export class RequiredFieldError extends Error {
    constructor(fieldName?: string) {
        const message =
            fieldName === undefined ? "Field required" : `The field ${fieldName} is required`;
        super(message);
        this.name = "RequiredFieldError";
    }
}

/**
 * Validation error class for general validation failures
 */
export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

