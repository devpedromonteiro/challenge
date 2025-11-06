import { AuthenticationMiddleware } from "@/application/middlewares";
import { setupAuthorize } from "@/domain/use-cases";
import { makeJwtAdapter } from "@/main/factories/infra/gateways/jwt-adapter";

/**
 * Factory function to create an AuthenticationMiddleware with use case injection
 * @returns AuthenticationMiddleware instance
 */
export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
    const tokenValidator = makeJwtAdapter();
    const authorize = setupAuthorize(tokenValidator);
    return new AuthenticationMiddleware(authorize);
};

