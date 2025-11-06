import jwt from "jsonwebtoken";
import type { TokenGenerator, TokenValidator } from "@/domain/contracts/gateways";

/**
 * JWT adapter for generating and validating tokens
 */
export class JwtAdapter implements TokenGenerator, TokenValidator {
    constructor(private readonly secret: string) {}

    /**
     * Generates a JWT token for a user
     * @param params - Token generation parameters
     * @returns Promise that resolves to the token
     */
    async generate(params: TokenGenerator.Params): Promise<string> {
        const expirationInSeconds = Math.floor(params.expirationInMs / 1000);

        return jwt.sign({ sub: params.key }, this.secret, {
            expiresIn: expirationInSeconds,
        });
    }

    /**
     * Validates a JWT token and returns the user ID
     * @param params - Token validation parameters
     * @returns Promise that resolves to the user ID
     * @throws Error if token is invalid
     */
    async validate(params: TokenValidator.Params): Promise<string> {
        const decoded = jwt.verify(params.token, this.secret) as { sub: string };
        return decoded.sub;
    }
}

