export class ApiError extends Error {

  statusCode: number;
  key: string | undefined;

  constructor(name: string, statusCode: number, message: string, key?: string | undefined) {
    super();
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    this.key = key;
  }
}
