import { SqliteUserRepository } from "@/infra/repos/sqlite/user-repository";
import { makeSqliteConnection } from "./helpers/connection";

/**
 * Factory function to create a SqliteUserRepository instance
 * @returns A new SqliteUserRepository instance
 */
export const makeSqliteUserRepository = (): SqliteUserRepository => {
    return new SqliteUserRepository(makeSqliteConnection());
};

