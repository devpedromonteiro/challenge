import type { HashComparer, TokenGenerator } from "@/domain/contracts/gateways";
import type { UserRepository } from "@/domain/contracts/repos";
import { AccessToken } from "@/domain/entities";
import { AuthenticationError } from "@/domain/errors";

type Setup = (
    userRepository: UserRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
) => LoginUser;
type Input = { email: string; password: string };
type Output = { accessToken: string; user: { id: number; email: string; name: string } };

export type LoginUser = (input: Input) => Promise<Output>;

/**
 * Setup function for LoginUser use case
 * @param userRepository - User repository instance
 * @param hashComparer - Hash comparer instance
 * @param tokenGenerator - Token generator instance
 * @returns LoginUser use case function
 */
export const setupLoginUser: Setup =
    (userRepository, hashComparer, tokenGenerator) =>
    async ({ email, password }) => {
        // Load user by email
        const user = await userRepository.load({ email });

        if (!user) {
            throw new AuthenticationError();
        }

        // Compare passwords
        const isValid = await hashComparer.compare(password, user.password);

        if (!isValid) {
            throw new AuthenticationError();
        }

        // Generate token
        const accessToken = await tokenGenerator.generate({
            key: String(user.id),
            expirationInMs: AccessToken.expirationInMs,
        });

        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    };

