import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';
import { errorHandler } from './middlewares/error-handler.middleware';
import { NotFoundError } from './exceptions/not-found.exception';

// App instance
const app: Application = express();

// Security Middlewares
app.use(helmet());
app.use(cors());

// Body parser
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Mount API routes
app.use('/', routes);

// Handling Not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
});

// Centralized Error Handling
app.use(errorHandler);

export default app;
