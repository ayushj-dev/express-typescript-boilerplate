import { z } from 'zod';
import { CONFIG_CONSTANTS } from '@/constants/config.constant';
import { extractValuesAsTuple } from '@/utils/zod.util';
import { ERROR_CONSTANTS } from '@/constants/error.constant';

const ENVS = extractValuesAsTuple(CONFIG_CONSTANTS.ENVS);

export const ConfigSchema = z.object({
  NODE_ENV: z.enum(ENVS),
  PORT: z.string()
    .length(4, { message: ERROR_CONSTANTS.ENV.PORT.LENGTH })
    .regex(/^\d+$/, { message: ERROR_CONSTANTS.ENV.PORT.REGEX })
    .transform(Number),

  /* SQL related varialbes */
  POSTGRES_URL: z.string().url(),

  /* NoSQL related varialbes */
  MONGO_URL: z.string().url(),

  /* JWT related varialbes */
  JWT_ACCESS_TOKEN_EXPIRY: z.string().min(1, ERROR_CONSTANTS.ENV.JWT_EXPIRY).transform(Number),
  JWT_REFRESH_TOKEN_EXPIRY: z.string().min(1, ERROR_CONSTANTS.ENV.JWT_EXPIRY).transform(Number),
  JWT_ACCESS_TOKEN_SECRET: z.string().min(10, ERROR_CONSTANTS.ENV.JWT_SECRET),
  JWT_REFRESH_TOKEN_SECRET: z.string().min(10, ERROR_CONSTANTS.ENV.JWT_SECRET),

  /* Valkey related varialbes */
  VALKEY_HOST: z.string().ip(),
  VALKEY_PORT: z.string()
    .length(4, { message: ERROR_CONSTANTS.ENV.PORT.LENGTH })
    .regex(/^\d+$/, { message: ERROR_CONSTANTS.ENV.PORT.REGEX })
    .transform(Number),

  /* Rate limiting related varialbes */
  WINDOW_SIZE_IN_SECONDS: z.string().regex(/^[1-9]\d*$/, ERROR_CONSTANTS.ENV.WINDOW_SIZE_IN_SECONDS).transform(Number),
  MAX_REQUESTS: z.string().regex(/^[1-9]\d*$/, ERROR_CONSTANTS.ENV.MAX_REQUESTS).transform(Number)
  /**/
});
