import { logger } from '@/utils/logger.util';
import { Request, Response, NextFunction } from 'express';

export const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info({
    msg: "Handled request",
    url: req.originalUrl,
    method: req.method,
    userAgent: req.headers['user-agent'],
    ip: req.ip,
    requestId: req.headers['x-request-id'] || 'N/A',
  });

  next();
}
