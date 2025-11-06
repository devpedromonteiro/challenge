import type { TaskModel } from '@/domain/models'

export type AddTaskParams = {
  title: string
  description: string
}

export interface AddTask {
  add: (params: AddTaskParams) => Promise<TaskModel>
}

