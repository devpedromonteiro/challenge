import { Controller } from "@/application/controllers";
import { ok, type HttpResponse } from "@/application/helpers";

/**
 * Health check controller
 */
export class HealthzController extends Controller {
    /**
     * Performs health check
     * @returns HTTP response with health status
     */
    async perform(): Promise<HttpResponse> {
        return ok({ status: "ok", timestamp: new Date().toISOString() });
    }
}

