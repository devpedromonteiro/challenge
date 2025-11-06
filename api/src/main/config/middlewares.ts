import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

/**
 * Applies middleware to Express application
 * @param app - Express application instance
 */
export const applyMiddlewares = (app: Express): void => {
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use((_req, res, next) => {
        res.type("json");
        next();
    });
};
