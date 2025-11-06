export type DeleteTaskParams = {
  id: number
}

export interface DeleteTask {
  delete: (params: DeleteTaskParams) => Promise<void>
}

