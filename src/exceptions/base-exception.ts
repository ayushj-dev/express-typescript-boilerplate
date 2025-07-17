export class HttpError extends Error {
  public statusCode: number;
  public originalError?: Error;

  constructor(statusCode: number, message: string, originalError?: Error) {
    super(message);

    this.statusCode = statusCode;
    this.originalError = originalError;

    // This line is important for proper stack trace capturing in Node.js
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
