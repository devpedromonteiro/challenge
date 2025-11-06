import type { HttpResponse } from "@/application/helpers";

/**
 * Middleware interface
 */
export interface Middleware {
    /**
     * Handles the middleware logic
     * @param httpRequest - HTTP request data
     * @returns HTTP response
     */
    handle(httpRequest: any): Promise<HttpResponse>;
}

