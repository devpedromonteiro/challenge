import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import type { TaskModel } from '@/domain/models'
import type { AddTask, AddTaskParams } from '@/domain/use-cases'
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'

export class RemoteAddTask implements AddTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAddTask.Model>
  ) {}

  async add(params: AddTaskParams): Promise<TaskModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        const task = httpResponse.body!
        return {
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt)
        }
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAddTask {
  export type Model = TaskModel
}

