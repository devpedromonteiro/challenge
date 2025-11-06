import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import type { UpdateTask, UpdateTaskParams } from '@/domain/use-cases'
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'

export class RemoteUpdateTask implements UpdateTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async update(params: UpdateTaskParams): Promise<void> {
    const { id, ...body } = params
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'put',
      body
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent:
        return
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}

