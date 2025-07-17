import { HTTP_STATUS_CONSTANTS } from "@/constants/http-status.constant";
import { HttpError } from "./base-exception";

/**
 * 429 Too Many Requests Error (from your original example)
 * Indicates that the user has sent too many requests in a given amount of time ("rate limiting").
 */
export class TooManyRequestsError extends HttpError {
  constructor(message = 'Too many requests, please try again later.') {
    super(HTTP_STATUS_CONSTANTS.TOO_MANY_REQUESTS, message);
  }
}
