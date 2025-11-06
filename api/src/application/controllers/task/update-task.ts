import { Controller } from "@/application/controllers";
import { noContent, notFound, type HttpResponse } from "@/application/helpers";
import { AllowedValues, RequiredNumber, type Validator } from "@/application/validation";
import { TaskNotFoundError } from "@/domain/errors";
import type { UpdateTask } from "@/domain/use-cases";

type HttpRequest = {
    id?: number;
    title?: string;
    description?: string;
    status?: string;
};

type Model = Error | null;

/**
 * Controller for updating a task
 */
export class UpdateTaskController extends Controller {
    constructor(private readonly updateTask: UpdateTask) {
        super();
    }

    /**
     * Build validators for the request
     * @param httpRequest - HTTP request data
     * @returns Array of validators
     */
    override buildValidators(httpRequest: HttpRequest): Validator[] {
        const ALLOWED_STATUS = ["pending", "completed"];

        return [
            new RequiredNumber(httpRequest.id ?? Number.NaN, "id"),
            new AllowedValues(httpRequest.status, ALLOWED_STATUS, "status"),
        ];
    }

    /**
     * Perform the update of a task
     * @param httpRequest - HTTP request data
     * @returns HTTP response with no content or error
     */
    async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
        try {
            const { id, title, description, status } = httpRequest;

            await this.updateTask({
                id: id as number,
                title,
                description,
                status: status as "pending" | "completed" | undefined,
            });

            return noContent();
        } catch (error) {
            if (error instanceof TaskNotFoundError) {
                return notFound(error);
            }
            throw error;
        }
    }
}

