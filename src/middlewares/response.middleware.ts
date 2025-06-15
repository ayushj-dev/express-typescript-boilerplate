import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CONSTANTS } from '@/constants/http-status.constant';

/**
 * Interface for the standardized response structure.
 * This defines the consistent format for all API responses.
 */
interface StandardizedResponse<T = any> {
  success: boolean;
  status_code: number;
  message: string;
  data?: T;
  error?: any;
}

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = function(body?: any): Response {
    let success: boolean = true;
    let message: string = body?.message ?? 'Operation successful';
    let data: any = body?.data ?? null;
    let error: any = null;

    if (body instanceof Error) {
      success = false;
      message = body?.message ?? 'An unexpected error occurred';
      error = body;
      data = null;
      res.statusCode = res.statusCode >= HTTP_STATUS_CONSTANTS.NOT_FOUND ? res.statusCode : HTTP_STATUS_CONSTANTS.INTERNAL_SERVER_ERROR;
    }

    else if (res.statusCode >= 400) {
      success = false;
      message = `Request failed with status code ${res.statusCode}`;
      data = null;

      if (typeof body === 'object' && body !== null && body.message) {
        message = body.message;
        error = body.error;
      }
    }

    const standardizedResponse: StandardizedResponse = {
      success,
      status_code: res.statusCode,
      message,
      data,
      error
    };

    // Call the original `res.json` method to send the standardized response.
    // We use `call(this, ...)` to ensure `this` context (which is `res`) is preserved.
    return originalJson.call(this, standardizedResponse);
  };

  next();
}
