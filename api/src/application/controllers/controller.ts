import { badRequest, type HttpResponse, serverError } from "@/application/helpers";
import { ValidationComposite, type Validator } from "@/application/validation";

/**
 * Base controller class with validation and error handling
 */
export abstract class Controller {
    /**
     * Main method to be implemented by subclasses
     * @param httpRequest - HTTP request data
     * @returns HTTP response
     */
    abstract perform(httpRequest: any): Promise<HttpResponse>;

    /**
     * Optional method to build validators for the request
     * @param _httpRequest - HTTP request data
     * @returns Array of validators
     */
    buildValidators(_httpRequest: any): Validator[] {
        return [];
    }

    /**
     * Handles the request with validation and error handling
     * @param httpRequest - HTTP request data
     * @returns HTTP response
     */
    async handle(httpRequest: any): Promise<HttpResponse> {
        const error = this.validate(httpRequest);

        if (error !== undefined) return badRequest(error);

        try {
            return await this.perform(httpRequest);
        } catch (error) {
            return serverError(error);
        }
    }

    /**
     * Validates the request using the validators
     * @param httpRequest - HTTP request data
     * @returns Error if validation fails
     */
    private validate(httpRequest: any): Error | undefined {
        const validators = this.buildValidators(httpRequest);

        return new ValidationComposite(validators).validate();
    }
}

