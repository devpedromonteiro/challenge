import type { TaskModel } from '@/domain/models'

export type LoadTasksParams = {
  status?: 'pending' | 'completed'
  search?: string
}

export interface LoadTasks {
  loadAll: (params?: LoadTasksParams) => Promise<TaskModel[]>
}

