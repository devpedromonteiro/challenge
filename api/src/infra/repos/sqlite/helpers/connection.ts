import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { ConnectionNotFoundError } from "./errors";

/**
 * SQLite connection manager using Singleton pattern
 * Manages database connections using better-sqlite3
 */
export class SqliteConnection {
    private static instance?: SqliteConnection;
    private db?: Database.Database;
    private dbPath: string;

    /**
     * Private constructor to enforce Singleton pattern
     * @param dbPath - Path to SQLite database file
     */
    private constructor(dbPath: string) {
        this.dbPath = dbPath;
    }

    /**
     * Gets the singleton instance of SqliteConnection
     * @param dbPath - Path to SQLite database file (only used on first call)
     * @returns The SqliteConnection instance
     */
    static getInstance(dbPath = "./data/database.sqlite"): SqliteConnection {
        if (!SqliteConnection.instance) {
            SqliteConnection.instance = new SqliteConnection(dbPath);
        }
        return SqliteConnection.instance;
    }

    /**
     * Establishes connection to SQLite database
     * @returns Promise that resolves when connection is established
     */
    async connect(): Promise<void> {
        // Create directory if it doesn't exist
        const dir = dirname(this.dbPath);
        mkdirSync(dir, { recursive: true });

        this.db = new Database(this.dbPath);
        this.db.pragma("journal_mode = WAL");
        this.initializeSchema();
    }

    /**
     * Initializes database schema
     */
    private initializeSchema(): void {
        if (!this.db) return;

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'completed')),
                createdAt TEXT NOT NULL DEFAULT (datetime('now')),
                updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
            );
        `);
    }

    /**
     * Closes connection to SQLite database
     * @returns Promise that resolves when connection is closed
     */
    async disconnect(): Promise<void> {
        if (this.db) {
            this.db.close();
            this.db = undefined;
        }
    }

    /**
     * Gets the better-sqlite3 database instance
     * @throws {ConnectionNotFoundError} If database is not connected
     * @returns The better-sqlite3 database instance
     */
    getDb(): Database.Database {
        if (!this.db) {
            throw new ConnectionNotFoundError();
        }
        return this.db;
    }

    /**
     * Resets the singleton instance (useful for testing)
     */
    static reset(): void {
        SqliteConnection.instance = undefined;
    }
}

