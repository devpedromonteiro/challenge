/**
 * Validator interface
 */
export interface Validator {
    validate: () => Error | undefined;
}

