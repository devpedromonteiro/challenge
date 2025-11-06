import express from "express";
import { setupDocs } from "@/main/config/docs";
import { applyMiddlewares } from "@/main/config/middlewares";
import { setupRoutes } from "@/main/config/routes";

/**
 * Express application instance configured with middleware, routes and documentation
 */
const app = express();
setupDocs(app);
applyMiddlewares(app);
setupRoutes(app);
export { app };

