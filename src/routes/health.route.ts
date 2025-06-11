import { Router } from 'express';
import { HealthController } from '@/controllers/health.controller';
import { HealthService } from '@/services/health.service';

const healthRouter = Router();

const healthService = new HealthService();

const healthController = new HealthController(healthService);

/* Routes start here */

healthRouter.get('/', healthController.checkHealth);

/* Routes end here */

export { healthRouter };
