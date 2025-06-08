import { z } from 'zod';
import { CONFIG_CONSTANTS } from '../constants/config.constant';
import { extractValuesAsTuple } from '../utils/zod.util';
import { ERRORS } from '../constants/error.constant';

const ENVS = extractValuesAsTuple(CONFIG_CONSTANTS.ENVS);

export const ConfigSchema = z.object({
  NODE_ENV: z.enum(ENVS),
  PORT: z.string()
    .length(4, { message: ERRORS.ENV.PORT.LENGTH })
    .regex(/^\d+$/, { message: ERRORS.ENV.PORT.REGEX })
    .transform(Number),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_TOKEN_EXPIRY: z.string(),
  JWT_REFRESH_TOKEN_EXPIRY: z.string(),
  JWT_ACCESS_TOKEN_SECRET: z.string().min(10, ERRORS.ENV.JWT_SECRET),
  JWT_REFRESH_TOKEN_SECRET: z.string().min(10, ERRORS.ENV.JWT_SECRET),
});
