import { Controller } from "@/application/controllers/controller";
import { ok, type HttpResponse, unauthorized } from "@/application/helpers";
import { RequiredString, type Validator } from "@/application/validation";
import { AuthenticationError } from "@/domain/errors";
import type { LoginUser } from "@/domain/use-cases";

type HttpRequest = {
    email?: string;
    password?: string;
};

type Model =
    | Error
    | {
          accessToken: string;
          user: { id: number; email: string; name: string };
      };

/**
 * Controller for user login
 */
export class LoginController extends Controller {
    constructor(private readonly loginUser: LoginUser) {
        super();
    }

    /**
     * Build validators for the request
     * @param httpRequest - HTTP request data
     * @returns Array of validators
     */
    override buildValidators(httpRequest: HttpRequest): Validator[] {
        return [
            new RequiredString(httpRequest.email ?? "", "email"),
            new RequiredString(httpRequest.password ?? "", "password"),
        ];
    }

    /**
     * Perform the user login
     * @param httpRequest - HTTP request data
     * @returns HTTP response with access token or error
     */
    async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
        try {
            const { email, password } = httpRequest;

            const result = await this.loginUser({
                email: email as string,
                password: password as string,
            });

            return ok(result);
        } catch (error) {
            if (error instanceof AuthenticationError) {
                return unauthorized();
            }
            throw error;
        }
    }
}

