import type Database from "better-sqlite3";
import type { SqliteConnection } from "./helpers/connection";

/**
 * Abstract base class for SQLite repositories
 * Provides access to the better-sqlite3 database instance through SqliteConnection
 */
export abstract class SqliteRepository {
    /**
     * Creates a new SqliteRepository instance
     * @param connection - The SQLite connection manager
     */
    constructor(private readonly connection: SqliteConnection) {}

    /**
     * Gets the better-sqlite3 database instance
     * @returns The better-sqlite3 database instance
     */
    protected getDb(): Database.Database {
        return this.connection.getDb();
    }
}

