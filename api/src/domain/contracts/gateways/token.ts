/**
 * Token generator contract
 */
export interface TokenGenerator {
    /**
     * Generates a token for a user
     * @param params - Token generation parameters
     * @returns Promise that resolves to the token
     */
    generate(params: TokenGenerator.Params): Promise<string>;
}

export namespace TokenGenerator {
    export type Params = {
        key: string;
        expirationInMs: number;
    };
}

/**
 * Token validator contract
 */
export interface TokenValidator {
    /**
     * Validates a token and returns the user ID
     * @param params - Token validation parameters
     * @returns Promise that resolves to the user ID
     */
    validate(params: TokenValidator.Params): Promise<string>;
}

export namespace TokenValidator {
    export type Params = {
        token: string;
    };
}

