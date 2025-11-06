import { SqliteConnection } from "@/infra/repos/sqlite/helpers/connection";
import { env } from "@/main/config/env";

/**
 * Factory function to get the SqliteConnection singleton instance
 * @returns The SqliteConnection singleton instance
 */
export const makeSqliteConnection = (): SqliteConnection => {
    return SqliteConnection.getInstance(env.db.path);
};

