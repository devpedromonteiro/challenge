import { Controller } from "@/application/controllers/controller";
import { notFound, ok, type HttpResponse } from "@/application/helpers";
import { RequiredNumber, type Validator } from "@/application/validation";
import type { TaskModel } from "@/domain/contracts/repos";
import { TaskNotFoundError } from "@/domain/errors";
import type { LoadTaskById } from "@/domain/use-cases";

type HttpRequest = {
    id?: number;
    userId?: string;
};

type Model = Error | TaskModel;

/**
 * Controller for loading a task by ID
 */
export class LoadTaskByIdController extends Controller {
    constructor(private readonly loadTaskById: LoadTaskById) {
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
     * Perform the loading of a task
     * @param httpRequest - HTTP request data
     * @returns HTTP response with task or error
     */
    async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
        try {
            const { id, userId } = httpRequest;

            const task = await this.loadTaskById({
                id: id as number,
                userId: Number(userId),
            });

            return ok(task);
        } catch (error) {
            if (error instanceof TaskNotFoundError) {
                return notFound(error);
            }
            throw error;
        }
    }
}
