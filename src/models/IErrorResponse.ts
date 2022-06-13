export interface IErrorResponse {
  error?: {
    data?: {
      reason?: string
    },
    status?: number
  },
  data?: {
    id?: number
  } | 'OK'
}
