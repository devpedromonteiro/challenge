import type { Router } from "express";
import { adaptExpressMiddleware, adaptExpressRoute } from "@/main/adapters";
import {
    makeCreateTaskController,
    makeDeleteTaskController,
    makeListTasksController,
    makeLoadTaskByIdController,
    makeUpdateTaskController,
} from "@/main/factories/application/controllers";
import { makeAuthenticationMiddleware } from "@/main/factories/application/middlewares/authentication";

/**
 * Sets up task routes
 * All task routes are protected by authentication middleware
 * @param router - Express router instance
 */
export default (router: Router): void => {
    const auth = adaptExpressMiddleware(makeAuthenticationMiddleware());

    router.post("/tasks", auth, adaptExpressRoute(makeCreateTaskController()));
    router.get("/tasks", auth, adaptExpressRoute(makeListTasksController()));
    router.get(
        "/tasks/:id",
        auth,
        adaptExpressRoute(makeLoadTaskByIdController())
    );
    router.put(
        "/tasks/:id",
        auth,
        adaptExpressRoute(makeUpdateTaskController())
    );
    router.delete(
        "/tasks/:id",
        auth,
        adaptExpressRoute(makeDeleteTaskController())
    );
};

