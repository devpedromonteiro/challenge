import type { Router } from "express";
import { adaptExpressRoute } from "@/main/adapters";
import { makeHealthzController } from "@/main/factories/application/controllers";

/**
 * Sets up health check route
 * @param router - Express router instance
 */
export default (router: Router): void => {
    router.get("/healthz", adaptExpressRoute(makeHealthzController()));
};

