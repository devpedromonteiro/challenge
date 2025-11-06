import { Controller } from "@/application/controllers/controller";
import { noContent, notFound, type HttpResponse } from "@/application/helpers";
import { RequiredNumber, type Validator } from "@/application/validation";
import { TaskNotFoundError } from "@/domain/errors";
import type { DeleteTask } from "@/domain/use-cases";

type HttpRequest = {
    id?: number;
    userId?: string;
};

type Model = Error | null;

/**
 * Controller for deleting a task
 */
export class DeleteTaskController extends Controller {
    constructor(private readonly deleteTask: DeleteTask) {
        super();
    }

    /**
     * Build validators for the request
     * @param httpRequest - HTTP request data
     * @returns Array of validators
     */
    override buildValidators(httpRequest: HttpRequest): Validator[] {
        return [new RequiredNumber(httpRequest.id ?? Number.NaN, "id")];
    }

    /**
     * Perform the deletion of a task
     * @param httpRequest - HTTP request data
     * @returns HTTP response with no content or error
     */
    async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
        try {
            const { id, userId } = httpRequest;

            await this.deleteTask({
                id: id as number,
                userId: Number(userId),
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
