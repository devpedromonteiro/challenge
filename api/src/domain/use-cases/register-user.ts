import type { HashGenerator } from "@/domain/contracts/gateways";
import type { CreateUserParams, UserRepository } from "@/domain/contracts/repos";
import type { UserProfile } from "@/domain/entities";
import { EmailInUseError } from "@/domain/errors";

type Setup = (userRepository: UserRepository, hashGenerator: HashGenerator) => RegisterUser;
type Input = { email: string; name: string; password: string };
type Output = UserProfile;

export type RegisterUser = (input: Input) => Promise<Output>;

/**
 * Setup function for RegisterUser use case
 * @param userRepository - User repository instance
 * @param hashGenerator - Hash generator instance
 * @returns RegisterUser use case function
 */
export const setupRegisterUser: Setup =
    (userRepository, hashGenerator) =>
    async ({ email, name, password }) => {
        // Check if email already exists
        const emailExists = await userRepository.emailExists(email);
        if (emailExists) {
            throw new EmailInUseError();
        }

        // Hash password
        const hashedPassword = await hashGenerator.hash(password);

        // Create user
        const params: CreateUserParams = {
            email,
            name,
            password: hashedPassword,
        };

        const user = await userRepository.create(params);

        return user;
    };

