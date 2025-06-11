import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '@/constants/http-status.constant';
import { HealthService } from '@/services/health.service';
import { NotFoundError } from '@/exceptions/not-found.exception';

export class HealthController {

  constructor(private healthService: HealthService) { }

  checkHealth = (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = this.healthService.checkHealth();

      res.status(HTTP_STATUS.OK).json({
        message: "Health fetched successfully!",
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}
