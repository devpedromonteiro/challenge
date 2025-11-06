import { Controller } from "@/application/controllers";
import { created, type HttpResponse } from "@/application/helpers";
import { ForbiddenField, RequiredString, type Validator } from "@/application/validation";
import type { TaskModel } from "@/domain/contracts/repos";
import type { CreateTask } from "@/domain/use-cases";

type HttpRequest = {
    title?: string;
    description?: string;
    id?: number;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
};

type Model = Error | TaskModel;

/**
 * Controller for creating a new task
 */
export class CreateTaskController extends Controller {
    constructor(private readonly createTask: CreateTask) {
        super();
    }

    /**
     * Build validators for the request
     * @param httpRequest - HTTP request data
     * @returns Array of validators
     */
    override buildValidators(httpRequest: HttpRequest): Validator[] {
        return [
            new RequiredString(httpRequest.title ?? "", "title"),
            new RequiredString(httpRequest.description ?? "", "description"),
            new ForbiddenField(httpRequest.id, "id"),
            new ForbiddenField(httpRequest.status, "status"),
            new ForbiddenField(httpRequest.createdAt, "createdAt"),
            new ForbiddenField(httpRequest.updatedAt, "updatedAt"),
        ];
    }

    /**
     * Perform the creation of a task
     * @param httpRequest - HTTP request data
     * @returns HTTP response with created task or error
     */
    async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
        const { title, description } = httpRequest;

        const task = await this.createTask({
            title: title as string,
            description: description as string,
        });

        return created(task);
    }
}

