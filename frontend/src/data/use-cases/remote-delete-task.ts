import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import type { DeleteTask, DeleteTaskParams } from '@/domain/use-cases'
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'

export class RemoteDeleteTask implements DeleteTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async delete(params: DeleteTaskParams): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'delete'
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

