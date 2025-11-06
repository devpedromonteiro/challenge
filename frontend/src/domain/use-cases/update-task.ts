export type UpdateTaskParams = {
  id: number
  title?: string
  description?: string
  status?: 'pending' | 'completed'
}

export interface UpdateTask {
  update: (params: UpdateTaskParams) => Promise<void>
}

