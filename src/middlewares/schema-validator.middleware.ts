import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { HTTP_STATUS } from '@/constants/http-status.constant';

export const validateSchema = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = {
        ...req.query,
        ...req.params,
        ...req.body
      };

      const result = schema.parse(payload);

      req.data = result;

      next();
    } catch (err) {

      if (err instanceof ZodError) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: 'Bad Schema',
          error: err.errors,
        });

        return;
      }

      next(err);
    }
  }
}
