/** https://www.postgresql.org/docs/current/errcodes-appendix.html */
export const POSTGRES_ERROR_HTTP_MAP: Record<
  string,
  { statusCode: number; message: string }
> = {
  '23505': {
    statusCode: 409,
    message: 'Resource already exists',
  },
  '23503': {
    statusCode: 409,
    message: 'Related resource not found or invalid',
  },
  '23502': {
    statusCode: 400,
    message: 'Required value is missing',
  },
  '23514': {
    statusCode: 400,
    message: 'One or more field values are invalid',
  },
  '23P01': {
    statusCode: 409,
    message: 'Conflicting data',
  },
  '22P02': {
    statusCode: 400,
    message: 'Invalid value format',
  },
  '22001': {
    statusCode: 400,
    message: 'Value is too long',
  },
  '22003': {
    statusCode: 400,
    message: 'Numeric value out of range',
  },
  '42703': {
    statusCode: 500,
    message: 'Internal server error',
  },
  '42P01': {
    statusCode: 500,
    message: 'Internal server error',
  },
};
