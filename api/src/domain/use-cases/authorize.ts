import type { TokenValidator } from "@/domain/contracts/gateways";

type Setup = (tokenValidator: TokenValidator) => Authorize;
type Input = { token: string };
type Output = string;

export type Authorize = (input: Input) => Promise<Output>;

/**
 * Setup function for Authorize use case
 * @param tokenValidator - Token validator instance
 * @returns Authorize use case function
 */
export const setupAuthorize: Setup =
    (tokenValidator) =>
    async ({ token }) => {
        const userId = await tokenValidator.validate({ token });
        return userId;
    };

