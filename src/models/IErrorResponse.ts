export interface IErrorResponse {
  status: number;
  data: {
    reason?: string;
    id?: number;
  }
}
