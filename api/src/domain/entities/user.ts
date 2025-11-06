/**
 * User entity representing a registered user in the system
 */
export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * User data without sensitive information
 */
export interface UserProfile {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

