export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode ?? 400;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
