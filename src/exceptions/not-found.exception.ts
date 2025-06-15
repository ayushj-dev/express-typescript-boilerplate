import { HTTP_STATUS_CONSTANTS } from "@/constants/http-status.constant";
import { HttpError } from "./base-exception";

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(HTTP_STATUS_CONSTANTS.NOT_FOUND, message);
  }
}
