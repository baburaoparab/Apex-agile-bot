import {ApiError} from './api-error';

export class BadRequestError extends ApiError {

  constructor(message: string, key?: string | undefined) {
    super('BadRequestError', 400, message, key);
  }
}
