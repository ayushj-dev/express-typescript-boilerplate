import { HTTP_STATUS } from "@/constants/http-status.constant";
import { HttpError } from "./base-exception";

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}
