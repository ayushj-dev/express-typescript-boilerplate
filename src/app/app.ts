/* Do not change the order of imports as it is crucial in order for app to work as expected */
import { CONFIG } from "@/config/config";
import { Application, json, urlencoded } from "express";
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import routes from '@/routes';
import { errorHandler } from "@/middlewares/error-handler.middleware";
import { responseMiddleware } from "@/middlewares/response.middleware";
import { requestMiddleware } from "@/middlewares/request.middleware";

/**
* Class use to create, initialize and get an express app instance.
*
* Always a fresh instance is returned (useful when writing test cases)
*
* NOTE: The class by itself does nothing, get method must be called in order to get express app instance.
*/
class App {
  private readonly app: Application = express();

  constructor() {
    this.initialize();
  }

  /**
  * Function to initialize the apps middlewares and routes
  *
  * IMPORTANT: If you are not sure then DO NOT CHANGE THE ORDER OF MIDDLEWARES & add newer ones between the comments
  */
  private initialize() {
    /* Security Middlewares */
    this.app.use(helmet());
    this.app.use(cors());

    /* Body parser */
    this.app.use(json());

    /* For parsing application/x-www-form-urlencoded */
    this.app.use(urlencoded({ extended: true }));

    /* Request logger middleware to log requests */
    this.app.use(requestMiddleware);

    /* Response middleware to standardize response structure */
    this.app.use(responseMiddleware);

    /* Add your middlewares below this comment */

    /* Add your middlewares above this comment */

    /* Entry point for routes */
    this.app.use(CONFIG.API_PREFIX, routes);

    /* Centralized Error Handling */
    this.app.use(errorHandler);
  }

  /**
  * Function to get the app instance
  */
  public get() {
    return this.app;
  }
}

export const app = new App().get();
