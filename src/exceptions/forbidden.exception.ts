import { HTTP_STATUS_CONSTANTS } from "@/constants/http-status.constant";
import { HttpError } from "./base-exception";

/**
 * 403 Forbidden Error
 * Indicates that the server understood the request but refuses to authorize it.
 * This is often due to insufficient permissions for the authenticated user.
 */
export class ForbiddenError extends HttpError {
  constructor(message = 'You do not have permission to access this resource.') {
    super(HTTP_STATUS_CONSTANTS.FORBIDDEN, message);
  }
}
