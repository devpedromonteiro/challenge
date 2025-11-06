import type { User, UserProfile } from "@/domain/entities";

/**
 * Parameters for creating a user
 */
export interface CreateUserParams {
    email: string;
    name: string;
    password: string;
}

/**
 * Parameters for loading a user
 */
export interface LoadUserParams {
    email?: string;
    id?: number;
}

/**
 * User repository contract
 */
export interface UserRepository {
    /**
     * Creates a new user
     * @param params - User creation parameters
     * @returns Promise that resolves to the created user profile
     */
    create(params: CreateUserParams): Promise<UserProfile>;

    /**
     * Loads a user by email or ID
     * @param params - Load parameters
     * @returns Promise that resolves to the user or null if not found
     */
    load(params: LoadUserParams): Promise<User | null>;

    /**
     * Checks if an email is already in use
     * @param email - Email to check
     * @returns Promise that resolves to true if email exists
     */
    emailExists(email: string): Promise<boolean>;
}

