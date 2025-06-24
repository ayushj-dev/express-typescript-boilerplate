import { Request, Response, NextFunction } from 'express';
import { getValkeyInstance } from '@/valkey/valkey-client';
import { CONFIG } from '@/config/config';
import { TooManyRequestsError } from '@/exceptions/too-many-requests.exception';

const valkey = getValkeyInstance();

/**
* Function to limit the number of requests a user can make in a given time period
*
* NOTE: This uses fixed window algorithm for rate limiting the user based on their IP address
*/
export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  const key = `rate-limit:${ip}`;
  const now = Date.now();

  try {
    const payload = await valkey.hgetall(key);

    if (Object.keys(payload).length === 0) {
      const payload = {
        count: '1',
        timestamp: now.toString()
      };

      await valkey.multi()
        .hset(key, payload)
        .expire(key, CONFIG.WINDOW_SIZE_IN_SECONDS)
        .exec();

      return next();
    }

    let count = parseInt(payload.count);

    if (count >= CONFIG.MAX_REQUESTS) {
      throw new TooManyRequestsError();
    }

    count++;

    payload.count = count.toString();

    await valkey.hset(key, payload);

    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    next(error);
  }
};
