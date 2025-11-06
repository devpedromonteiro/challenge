export type TaskStatus = 'pending' | 'completed'

export type TaskModel = {
  id: number
  title: string
  description: string
  status: TaskStatus
  createdAt: Date
  updatedAt: Date
}

