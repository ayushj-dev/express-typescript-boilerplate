import { logger } from '@/utils/logger.util';
import { Request, Response, NextFunction } from 'express';
import { asyncLocalStorage, RequestContext } from '@/context/context';
import { randomUUID } from 'crypto';

/**
 * Request middleware to initialize and manage the request-scoped context.
 * It also logs every request.
 */
export const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestId = randomUUID();

  logger.info({
    msg: "Handled request",
    url: req.originalUrl,
    method: req.method,
    userAgent: req.headers['user-agent'],
    ip: req.ip,
    requestId
  });

  const context: RequestContext = {
    requestId,
  };

  // Run the rest of the middleware chain and route handlers within this
  // AsyncLocalStorage context. This is the core of request-scoped data.
  asyncLocalStorage.run(context, () => {
    // Add more code here according to requirement
    next();
  });
}
