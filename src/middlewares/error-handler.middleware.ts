import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/http-status.constant';
import { HttpError } from '../exceptions/base-exception';
import { CONFIG } from '../config/config';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const statusCode = err instanceof HttpError ? err.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err instanceof HttpError ? err.message : 'Internal Server Error';
  const stack = CONFIG.NODE_ENV === 'development' ? err.stack : undefined;

  res.status(statusCode).json({
    success: false,
    message,
    stack
  });
};
