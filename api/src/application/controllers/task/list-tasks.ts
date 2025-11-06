import { Controller } from "@/application/controllers/controller";
import { ok, type HttpResponse } from "@/application/helpers";
import { AllowedValues, type Validator } from "@/application/validation";
import type { TaskModel } from "@/domain/contracts/repos";
import type { ListTasks } from "@/domain/use-cases";

type HttpRequest = {
    status?: string;
    search?: string;
    userId?: string;
};

type Model = Error | TaskModel[];

/**
 * Controller for listing tasks
 */
export class ListTasksController extends Controller {
    constructor(private readonly listTasks: ListTasks) {
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
            new AllowedValues(httpRequest.status, ALLOWED_STATUS, "status"),
        ];
    }

    /**
     * Perform the listing of tasks
     * @param httpRequest - HTTP request data
     * @returns HTTP response with tasks list or error
     */
    async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
        const { status, search, userId } = httpRequest;

        const tasks = await this.listTasks({
            status: status as "pending" | "completed" | undefined,
            search,
            userId: Number(userId),
        });

        return ok(tasks);
    }
}
