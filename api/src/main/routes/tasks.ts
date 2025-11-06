import type { Router } from "express";
import { adaptExpressRoute } from "@/main/adapters";
import {
    makeCreateTaskController,
    makeDeleteTaskController,
    makeListTasksController,
    makeLoadTaskByIdController,
    makeUpdateTaskController,
} from "@/main/factories/application/controllers";

/**
 * Sets up task routes
 * @param router - Express router instance
 */
export default (router: Router): void => {
    router.post("/tasks", adaptExpressRoute(makeCreateTaskController()));
    router.get("/tasks", adaptExpressRoute(makeListTasksController()));
    router.get("/tasks/:id", adaptExpressRoute(makeLoadTaskByIdController()));
    router.put("/tasks/:id", adaptExpressRoute(makeUpdateTaskController()));
    router.delete("/tasks/:id", adaptExpressRoute(makeDeleteTaskController()));
};

