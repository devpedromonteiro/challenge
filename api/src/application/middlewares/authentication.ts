import { forbidden, ok, type HttpResponse } from "@/application/helpers";
import { type Middleware } from "@/application/middlewares";
import { RequiredString } from "@/application/validation";
import type { Authorize } from "@/domain/use-cases";

type HttpRequest = { authorization?: string };
type Model = Error | { userId: string };

/**
 * Authentication middleware
 */
export class AuthenticationMiddleware implements Middleware {
    constructor(private readonly authorize: Authorize) {}

    /**
     * Handles the authentication logic
     * @param httpRequest - HTTP request data with authorization header
     * @returns HTTP response with userId or error
     */
    async handle({ authorization }: HttpRequest): Promise<HttpResponse<Model>> {
        if (!this.validate({ authorization })) return forbidden();

        try {
            // Remove "Bearer " prefix if present
            const token = authorization!.replace("Bearer ", "");
            const userId = await this.authorize({ token });
            return ok({ userId });
        } catch {
            return forbidden();
        }
    }

    /**
     * Validates the authorization header
     * @param httpRequest - HTTP request data
     * @returns True if valid
     */
    private validate({ authorization }: HttpRequest): boolean {
        const error = new RequiredString(authorization ?? "", "authorization").validate();
        return error === undefined;
    }
}

