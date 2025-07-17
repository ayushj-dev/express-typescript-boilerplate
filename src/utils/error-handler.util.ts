import { HttpError } from '@/exceptions/base-exception';
import { InternalServerError } from '@/exceptions/internal-server-error.exception';

type HandleServiceErrorParams = {
  message?: string;
  err: any;
}

/**
 * A utility function to handle errors caught in service layer try/catch blocks.
 * If the error is already an instance of HttpError, it re-throws it directly.
 * Otherwise, it wraps the error in an InternalServerError, preserving the original error.
 */
export function handleServiceError({ message, err }: HandleServiceErrorParams) {
  if (err instanceof HttpError) {
    throw err;
  }

  throw new InternalServerError(message, err);
}
