import type { CreateUserParams, LoadUserParams, UserRepository } from "@/domain/contracts/repos";
import type { User, UserProfile } from "@/domain/entities";
import { SqliteRepository } from "./repository";

/**
 * SQLite implementation of User repository
 * Implements the UserRepository contract using better-sqlite3
 */
export class SqliteUserRepository extends SqliteRepository implements UserRepository {
    /**
     * Creates a new user
     * @param data - User data (email, name, password)
     * @returns Promise that resolves to the created user profile
     */
    async create(data: CreateUserParams): Promise<UserProfile> {
        const db = this.getDb();
        const stmt = db.prepare(`
            INSERT INTO users (email, name, password)
            VALUES (?, ?, ?)
        `);

        const info = stmt.run(data.email, data.name, data.password);

        const user = db
            .prepare("SELECT id, email, name, createdAt, updatedAt FROM users WHERE id = ?")
            .get(info.lastInsertRowid) as any;

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
        };
    }

    /**
     * Loads a user by email or ID
     * @param params - Load parameters
     * @returns Promise that resolves to the user or null if not found
     */
    async load(params: LoadUserParams): Promise<User | null> {
        const db = this.getDb();
        let query = "SELECT * FROM users WHERE ";
        const values: any[] = [];

        if (params.email) {
            query += "email = ?";
            values.push(params.email);
        } else if (params.id) {
            query += "id = ?";
            values.push(params.id);
        } else {
            return null;
        }

        const user = db.prepare(query).get(...values) as any;

        if (!user) {
            return null;
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            password: user.password,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
        };
    }

    /**
     * Checks if an email is already in use
     * @param email - Email to check
     * @returns Promise that resolves to true if email exists
     */
    async emailExists(email: string): Promise<boolean> {
        const db = this.getDb();
        const result = db.prepare("SELECT 1 FROM users WHERE email = ? LIMIT 1").get(email);
        return !!result;
    }
}

