import { Router } from 'express';
import { healthRouter } from './health.route';
import { authRouter } from './auth.route';

const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);

export default router;
