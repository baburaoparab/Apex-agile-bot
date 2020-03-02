import {ApiError} from './api-error';

export class UnauthorizedError extends ApiError {
  constructor(errorMessage: string, key?: string | undefined) {
    super('Unauthorized', 401, errorMessage, key);
  }
}
