import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../constants/http-status.constant';
import { HealthService } from '../services/health.service';

export class HealthController {
  constructor(private healthService: HealthService) { }

  checkHealth = (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = this.healthService.checkHealth();

      res.status(HTTP_STATUS.OK).send({ message: result });
    } catch (error) {
      next(error);
    }
  }
}
