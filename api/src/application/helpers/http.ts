import { ServerError } from "@/application/errors";

/**
 * HTTP response type
 */
export type HttpResponse<T = any> = {
    statusCode: number;
    data: T;
};

/**
 * Creates a successful response (200)
 * @param data - Response data
 * @returns HTTP response object
 */
export const ok = <T = any>(data: T): HttpResponse<T> => ({
    statusCode: 200,
    data,
});

/**
 * Creates a created response (201)
 * @param data - Response data
 * @returns HTTP response object
 */
export const created = <T = any>(data: T): HttpResponse<T> => ({
    statusCode: 201,
    data,
});

/**
 * Creates a no content response (204)
 * @returns HTTP response object
 */
export const noContent = (): HttpResponse<null> => ({
    statusCode: 204,
    data: null,
});

/**
 * Creates a bad request response (400)
 * @param error - Error object
 * @returns HTTP response object
 */
export const badRequest = (error: Error): HttpResponse<Error> => ({
    statusCode: 400,
    data: error,
});

/**
 * Creates a not found response (404)
 * @param error - Error object
 * @returns HTTP response object
 */
export const notFound = (error: Error): HttpResponse<Error> => ({
    statusCode: 404,
    data: error,
});

/**
 * Creates a server error response (500)
 * @param error - Error object
 * @returns HTTP response object
 */
export const serverError = (error: unknown): HttpResponse<Error> => ({
    statusCode: 500,
    data: new ServerError(error instanceof Error ? error : undefined),
});

