import { HTTP_STATUS } from "@/constants/http-status.constant";
import { HttpError } from "./base-exception";

export class InternalServerError extends HttpError {
  constructor(message = 'Internal Server Error') {
    super(HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
  }
}
