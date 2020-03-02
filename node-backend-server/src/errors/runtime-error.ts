import {ApiError} from './api-error';

export class RuntimeError extends ApiError {
  constructor(message: string, key?: string | undefined) {
    super('RuntimeError', 500, message, key);
  }
}
