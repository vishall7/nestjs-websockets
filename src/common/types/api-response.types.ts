export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
  requestId?: string;
}
