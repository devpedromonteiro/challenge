import { Controller } from "@/application/controllers/controller";
import { created, type HttpResponse } from "@/application/helpers";
import { ForbiddenField, RequiredString, type Validator } from "@/application/validation";
import type { UserProfile } from "@/domain/entities";
import { EmailInUseError } from "@/domain/errors";
import type { RegisterUser } from "@/domain/use-cases";

type HttpRequest = {
    email?: string;
    name?: string;
    password?: string;
    id?: number;
};

type Model = Error | UserProfile;

/**
 * Controller for user registration
 */
export class RegisterController extends Controller {
    constructor(private readonly registerUser: RegisterUser) {
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
            new RequiredString(httpRequest.name ?? "", "name"),
            new RequiredString(httpRequest.password ?? "", "password"),
            new ForbiddenField(httpRequest.id, "id"),
        ];
    }

    /**
     * Perform the user registration
     * @param httpRequest - HTTP request data
     * @returns HTTP response with created user or error
     */
    async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
        try {
            const { email, name, password } = httpRequest;

            const user = await this.registerUser({
                email: email as string,
                name: name as string,
                password: password as string,
            });

            return created(user);
        } catch (error) {
            if (error instanceof EmailInUseError) {
                return {
                    statusCode: 400,
                    data: error,
                };
            }
            throw error;
        }
    }
}

