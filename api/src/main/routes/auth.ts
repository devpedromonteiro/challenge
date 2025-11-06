import type { Router } from "express";
import { adaptExpressRoute } from "@/main/adapters";
import { makeLoginController, makeRegisterController } from "@/main/factories/application/controllers";

/**
 * Sets up authentication routes
 * @param router - Express router instance
 */
export default (router: Router): void => {
    router.post("/auth/register", adaptExpressRoute(makeRegisterController()));
    router.post("/auth/login", adaptExpressRoute(makeLoginController()));
};

