import { HTTP_STATUS_CONSTANTS } from "@/constants/http-status.constant";
import { HttpError } from "./base-exception";

/**
 * 405 Method Not Allowed Error
 * Indicates that the request method is known by the server but is not supported
 * by the target resource.
 */
export class MethodNotAllowedError extends HttpError {
  constructor(message = 'The HTTP method used is not allowed for this resource.') {
    super(HTTP_STATUS_CONSTANTS.METHOD_NOT_ALLOWED, message);
  }
}
