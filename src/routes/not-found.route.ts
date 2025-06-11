import { Router } from 'express';
import { NotFoundController } from '@/controllers/not-found.controller';

const notFoundRouter = Router();

const notFoundController = new NotFoundController();

/* Routes start here */

notFoundRouter.use(notFoundController.notFound);

/* Routes end here */

export { notFoundRouter };
