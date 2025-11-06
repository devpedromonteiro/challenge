import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import type { TaskModel } from '@/domain/models'
import type { LoadTasks, LoadTasksParams } from '@/domain/use-cases'
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'

export class RemoteLoadTasks implements LoadTasks {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadTasks.Model>
  ) {}

  async loadAll(params?: LoadTasksParams): Promise<TaskModel[]> {
    let url = this.url
    const queryParams = new URLSearchParams()
    
    if (params?.status) queryParams.append('status', params.status)
    if (params?.search) queryParams.append('search', params.search)
    
    const queryString = queryParams.toString()
    if (queryString) url += `?${queryString}`

    const httpResponse = await this.httpClient.request({
      url,
      method: 'get'
    })

    const remoteTasks = httpResponse.body || []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteTasks.map(task => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt)
        }))
      case HttpStatusCode.noContent:
        return []
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadTasks {
  export type Model = TaskModel[]
}

