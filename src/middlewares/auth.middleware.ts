import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@/utils/jwt.util';
import { UnauthorizedError } from '@/exceptions/unauthorized.exception';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) throw new UnauthorizedError(`Authentication token required`);

    const decodedValue = verifyAccessToken(token);

    if (!decodedValue) {
      throw new UnauthorizedError();
    }

    /* Set token and decoded user properties from JWT */
    req.token = token;
    req.user = decodedValue;

    next();
  } catch (error) {
    next(error);
  }
}
