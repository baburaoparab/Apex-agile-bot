import {ApiError} from './api-error';

export class NoResultError extends ApiError {
  constructor(message: string, name?: string, key?: string | undefined) {
    if (name) {
      super(name, 404, message, key);
    } else {
      super('NoResultError', 404, message, key);
    }
  }
}
