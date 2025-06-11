import { HTTP_STATUS } from "@/constants/http-status.constant";
import { HttpError } from "./base-exception";

export class TooManyRequestsError extends HttpError {
  constructor(message = 'Too many requests, please try again later.') {
    super(HTTP_STATUS.TOO_MANY_REQUESTS, message);
  }
}
