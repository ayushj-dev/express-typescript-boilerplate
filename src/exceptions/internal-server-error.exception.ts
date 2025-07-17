import { HTTP_STATUS_CONSTANTS } from "@/constants/http-status.constant";
import { HttpError } from "./base-exception";

/**
 * 500 Internal Server Error
 * A generic error message, given when an unexpected condition was encountered
 * and no more specific message is suitable.
 */
 export class InternalServerError extends HttpError {
   constructor(message = 'An unexpected error occurred on the server.', originalError?: Error) {
     super(HTTP_STATUS_CONSTANTS.INTERNAL_SERVER_ERROR, message, originalError);
   }
 }
