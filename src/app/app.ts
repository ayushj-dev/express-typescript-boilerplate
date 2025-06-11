import { json, urlencoded } from "express";
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import routes from '@/routes';
import { errorHandler } from "@/middlewares/error-handler.middleware";
import { responseMiddleware } from "@/middlewares/response.middleware";

class App {
  private readonly app = express();

  constructor() {
    this.initialize();
  }

  private initialize() {
    /* Security Middlewares */
    this.app.use(helmet());
    this.app.use(cors());

    /* Body parser */
    this.app.use(json());

    /* For parsing application/x-www-form-urlencoded */
    this.app.use(urlencoded({ extended: true }));

    /* Response middleware to standardize response structure */
    this.app.use(responseMiddleware);

    /* Entry point for routes */
    this.app.use('/', routes);

    /* Centralized Error Handling */
    this.app.use(errorHandler);
  }

  public get() {
    return this.app;
  }
}

export const app = new App().get();
