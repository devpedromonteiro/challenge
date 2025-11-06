import { makeSqliteConnection } from "@/main/factories/infra/repos/sqlite/helpers/connection";

const connection = makeSqliteConnection();

beforeAll(async () => {
    await connection.connect();
}, 30000);

afterAll(async () => {
    // Clear all data from tasks table after tests
    const db = connection.getDb();
    db.exec("DELETE FROM tasks");
    await connection.disconnect();
}, 10000);

