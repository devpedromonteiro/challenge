import { SqliteTaskRepository } from "@/infra/repos/sqlite/task-repository";
import { makeSqliteConnection } from "./helpers/connection";

/**
 * Factory function to create a SqliteTaskRepository instance
 * @returns A new SqliteTaskRepository instance
 */
export const makeSqliteTaskRepository = (): SqliteTaskRepository => {
    return new SqliteTaskRepository(makeSqliteConnection());
};

