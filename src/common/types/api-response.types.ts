export interface ApiSuccessResponse<T> {
  statusCode: number;
  message: string;
  requestId?: string;
  data: T;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  requestId?: string;
  details?: unknown;
}

/** @deprecated Use ApiSuccessResponse */
export type ApiResponse<T> = ApiSuccessResponse<T>;
