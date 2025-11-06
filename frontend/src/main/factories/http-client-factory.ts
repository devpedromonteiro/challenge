import { AxiosHttpClient } from '@/infra/http'

export const makeHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

export const makeAuthorizedHttpClient = (): AxiosHttpClient => {
  const httpClient = new AxiosHttpClient()
  const originalRequest = httpClient.request.bind(httpClient)
  
  httpClient.request = async (data) => {
    const account = localStorage.getItem('account')
    if (account) {
      const { accessToken } = JSON.parse(account)
      data.headers = {
        ...data.headers,
        Authorization: `Bearer ${accessToken}`
      }
    }
    return originalRequest(data)
  }
  
  return httpClient
}
