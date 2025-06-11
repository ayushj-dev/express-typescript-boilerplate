import { z } from 'zod';
import { SCHEMA_CONTANTS } from '@/constants/schema.constant';

export const registerSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  country_code: z.string().regex(SCHEMA_CONTANTS.REGEX.COUNTRY_CODE, { message: "Invalid country code. Only +91 is supported." }),
  mobile: z.string().regex(SCHEMA_CONTANTS.REGEX.MOBILE, { message: "Invalid mobile number. It must be a 10-digit number starting with 6-9." }),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be a minimum of 6 characters")
});

export const loginSchema = z.object({
  token: z.string().jwt(),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be a minimum of 6 characters")
});

export const logoutSchema = z.object({
  token: z.string().jwt()
});

export const refereshAccessSchema = z.object({
  token: z.string().jwt()
});
