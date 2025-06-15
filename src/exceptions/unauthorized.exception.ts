import { HTTP_STATUS_CONSTANTS } from "@/constants/http-status.constant";
import { HttpError } from "./base-exception";

export class UnauthorizedError extends HttpError {
  constructor(message = 'Invalid or expired authentication token') {
    super(HTTP_STATUS_CONSTANTS.UNAUTHORIZED, message);
  }
}
