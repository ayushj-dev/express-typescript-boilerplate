import { HTTP_STATUS_CONSTANTS } from "@/constants/http-status.constant";
import { HttpError } from "./base-exception";

/**
 * 401 Unauthorized Error
 * Indicates that the request has not been applied because it lacks valid
 * authentication credentials for the target resource.
 */
export class UnauthorizedError extends HttpError {
  constructor(message = 'Authentication required or invalid credentials.') {
    super(HTTP_STATUS_CONSTANTS.UNAUTHORIZED, message);
  }
}
