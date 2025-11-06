import { RemoteAuthentication, RemoteAddAccount, RemoteLoadTasks, RemoteAddTask, RemoteUpdateTask, RemoteDeleteTask } from '@/data/use-cases'
import { makeApiUrl } from '@/main/config/api-url'
import { makeHttpClient, makeAuthorizedHttpClient } from './http-client-factory'

export const makeAuthentication = () => {
  return new RemoteAuthentication(makeApiUrl('/auth/login'), makeHttpClient())
}

export const makeAddAccount = () => {
  return new RemoteAddAccount(makeApiUrl('/auth/register'), makeHttpClient())
}

export const makeLoadTasks = () => {
  return new RemoteLoadTasks(makeApiUrl('/tasks'), makeAuthorizedHttpClient())
}

export const makeAddTask = () => {
  return new RemoteAddTask(makeApiUrl('/tasks'), makeAuthorizedHttpClient())
}

export const makeUpdateTask = () => {
  return new RemoteUpdateTask(makeApiUrl('/tasks'), makeAuthorizedHttpClient())
}

export const makeDeleteTask = () => {
  return new RemoteDeleteTask(makeApiUrl('/tasks'), makeAuthorizedHttpClient())
}
