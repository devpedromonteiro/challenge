import type {
    CreateTaskParams,
    FilterTasksParams,
    TaskModel,
    TaskRepository,
    UpdateTaskParams,
} from "@/domain/contracts/repos";
import { SqliteRepository } from "./repository";

/**
 * SQLite implementation of Task repository
 * Implements the TaskRepository contract using better-sqlite3
 */
export class SqliteTaskRepository extends SqliteRepository implements TaskRepository {
    /**
     * Creates a new task
     * @param data - Task data (title, description, userId)
     * @returns Promise that resolves to the created task with status starting as 'pending'
     */
    async create(data: CreateTaskParams): Promise<TaskModel> {
        const db = this.getDb();
        const stmt = db.prepare(`
            INSERT INTO tasks (title, description, userId)
            VALUES (?, ?, ?)
        `);

        const info = stmt.run(data.title, data.description, data.userId);

        const task = db
            .prepare("SELECT * FROM tasks WHERE id = ?")
            .get(info.lastInsertRowid) as any;

        return {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status as "pending" | "completed",
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
        };
    }

    /**
     * Loads a task by ID
     * @param id - Task ID
     * @param userId - User ID (to ensure user can only access their own tasks)
     * @returns Promise that resolves to the task or null if not found
     */
    async loadById(id: number, userId: number): Promise<TaskModel | null> {
        const db = this.getDb();
        const task = db
            .prepare("SELECT * FROM tasks WHERE id = ? AND userId = ?")
            .get(id, userId) as any;

        if (!task) {
            return null;
        }

        return {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status as "pending" | "completed",
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
        };
    }

    /**
     * Lists all tasks with optional filters
     * @param params - Filter parameters (status, search, userId)
     * @returns Promise that resolves to an array of tasks
     */
    async listAll(params?: FilterTasksParams): Promise<TaskModel[]> {
        const db = this.getDb();
        let query = "SELECT * FROM tasks WHERE userId = ?";
        const queryParams: any[] = [params!.userId];

        if (params?.status) {
            query += " AND status = ?";
            queryParams.push(params.status);
        }

        if (params?.search) {
            query += " AND (title LIKE ? OR description LIKE ?)";
            const searchPattern = `%${params.search}%`;
            queryParams.push(searchPattern, searchPattern);
        }

        query += " ORDER BY createdAt DESC";

        const tasks = db.prepare(query).all(...queryParams) as any[];

        return tasks.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status as "pending" | "completed",
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
        }));
    }

    /**
     * Updates a task
     * @param id - Task ID
     * @param params - Update parameters (title, description, status)
     * @returns Promise that resolves when update is complete
     */
    async update(id: number, params: UpdateTaskParams): Promise<void> {
        const db = this.getDb();
        const updates: string[] = [];
        const values: any[] = [];

        if (params.title !== undefined) {
            updates.push("title = ?");
            values.push(params.title);
        }

        if (params.description !== undefined) {
            updates.push("description = ?");
            values.push(params.description);
        }

        if (params.status !== undefined) {
            updates.push("status = ?");
            values.push(params.status);
        }

        if (updates.length === 0) {
            return;
        }

        updates.push("updatedAt = datetime('now')");
        values.push(id);

        const query = `UPDATE tasks SET ${updates.join(", ")} WHERE id = ?`;
        db.prepare(query).run(...values);
    }

    /**
     * Deletes a task by ID
     * @param id - Task ID
     * @param userId - User ID (to ensure user can only delete their own tasks)
     * @returns Promise that resolves when deletion is complete
     */
    async deleteById(id: number, userId: number): Promise<void> {
        const db = this.getDb();
        db.prepare("DELETE FROM tasks WHERE id = ? AND userId = ?").run(
            id,
            userId
        );
    }
}
