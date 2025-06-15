import { HTTP_STATUS_CONSTANTS } from "@/constants/http-status.constant";
import { HttpError } from "./base-exception";

export class TooManyRequestsError extends HttpError {
  constructor(message = 'Too many requests, please try again later.') {
    super(HTTP_STATUS_CONSTANTS.TOO_MANY_REQUESTS, message);
  }
}
