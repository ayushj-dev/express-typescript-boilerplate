import { HTTP_STATUS_CONSTANTS } from "@/constants/http-status.constant";
import { HttpError } from "./base-exception";

/**
 * 503 Service Unavailable Error
 * Indicates that the server is not ready to handle the request.
 * Common causes are a server that is down for maintenance or that is overloaded.
 */
export class ServiceUnavailableError extends HttpError {
  constructor(message = 'The service is temporarily unavailable. Please try again later.') {
    super(HTTP_STATUS_CONSTANTS.SERVICE_UNAVAILABLE, message);
  }
}
