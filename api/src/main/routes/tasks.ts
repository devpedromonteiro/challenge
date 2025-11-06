import type { Router } from "express";
import { adaptExpressRoute } from "@/main/adapters";
import { makeCreateTaskController } from "@/main/factories/application/controllers";

/**
 * Sets up task routes
 * @param router - Express router instance
 */
export default (router: Router): void => {
    router.post("/tasks", adaptExpressRoute(makeCreateTaskController()));
};

