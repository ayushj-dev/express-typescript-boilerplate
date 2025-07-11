import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CONSTANTS } from '@/constants/http-status.constant';
import { logger } from '@/utils/logger.util';
import { API_CONSTANTS } from '@/constants/api.constant';

/**
 * Standard API response
 */
type ApiResponse = {
  meta: any;
  result: any;
} | null;

/**
 * Interface for the standardized response structure.
 * This defines the consistent format for all API responses.
 */
interface StandardizedResponse {
  success: boolean;
  status_code: number;
  message: string;
  data?: ApiResponse;
  error?: any;
}

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = function (body?: any): Response {
    let success: boolean = true;
    let message: string = body?.message ?? API_CONSTANTS.DEFAULT.SUCCESS_RESPONSE_MESSAGE;
    let data: ApiResponse = body?.data ?? null;
    let error: any = null;

    if (body instanceof Error) {
      success = false;
      message = body?.message ?? API_CONSTANTS.DEFAULT.ERROR_RESPONSE_MESSAGE;
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

    /* Logging every response */
    logger.info(standardizedResponse);

    // Call the original `res.json` method to send the standardized response.
    // We use `call(this, ...)` to ensure `this` context (which is `res`) is preserved.
    return originalJson.call(this, standardizedResponse);
  };

  next();
}
