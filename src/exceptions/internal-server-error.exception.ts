import { HTTP_STATUS_CONSTANTS } from "@/constants/http-status.constant";
import { HttpError } from "./base-exception";

export class InternalServerError extends HttpError {
  constructor(message = 'Internal Server Error') {
    super(HTTP_STATUS_CONSTANTS.INTERNAL_SERVER_ERROR, message);
  }
}
