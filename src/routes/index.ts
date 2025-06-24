import { Router } from 'express';
import { healthRouter } from './health.route';
import { authRouter } from './auth.route';
import { fileUploadRouter } from './file-upload.route';

const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/file-upload', fileUploadRouter);

export default router;
