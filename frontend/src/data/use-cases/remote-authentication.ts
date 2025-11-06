import { AccessDeniedError, InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import type { AccountModel } from '@/domain/models'
import type { Authentication, AuthenticationParams } from '@/domain/use-cases'
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthentication.Model>
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body!
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = AccountModel
}

