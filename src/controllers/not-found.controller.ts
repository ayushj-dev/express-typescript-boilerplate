import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '@/exceptions/not-found.exception';

export class NotFoundController {
  constructor() { }

  notFound = (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
  }
}
