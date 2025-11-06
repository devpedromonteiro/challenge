import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import type { AccountModel } from '@/domain/models'
import type { AddAccount, AddAccountParams } from '@/domain/use-cases'
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAddAccount.Model>
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        const user = httpResponse.body!
        // After registration, login to get the token
        return { ...user, accessToken: '' } as AccountModel
      case HttpStatusCode.badRequest:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAddAccount {
  export type Model = AccountModel
}

