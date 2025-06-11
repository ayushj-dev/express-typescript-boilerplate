import { Response, NextFunction } from 'express';
import { AuthRequest } from '@/types/auth.type';
import { verifyAccessToken } from '@/utils/jwt.util';
import { UnauthorizedError } from '@/exceptions/unauthorized.exception';

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) throw new UnauthorizedError(`Authentication token required`);

  const decodedValue = verifyAccessToken(token);

  if (!decodedValue) {
    throw new UnauthorizedError();
  }

  req.token = token;
  req.user = decodedValue;

  next();
}

module.exports = authenticateToken;
