import type { RequestHandler } from "express";
import type { Middleware } from "@/application/middlewares";

type Adapter = (middleware: Middleware) => RequestHandler;

/**
 * Adapts a middleware to work with Express middleware handler
 * @param middleware - Middleware instance
 * @returns Express request handler
 */
export const adaptExpressMiddleware: Adapter = (middleware) => async (req, res, next) => {
    const { statusCode, data } = await middleware.handle({
        authorization: req.headers.authorization,
        ...req.headers,
    });

    if (statusCode === 200) {
        // Success - attach data to locals and continue
        Object.assign(res.locals, data);
        return next();
    }

    // Error - return error response
    const json = { error: data.message };
    return res.status(statusCode).json(json);
};

