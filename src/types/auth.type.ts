import { Request } from 'express';
import { loginSchema, logoutSchema, refereshAccessSchema, registerSchema } from '@/schemas/auth.schema';
import { z } from 'zod';

export interface AuthRequest extends Request {
  user?: any;
  token?: string
}

export type RegisterParams = z.infer<typeof registerSchema>;
export type LoginParams = z.infer<typeof loginSchema>;
export type LogoutParams = z.infer<typeof logoutSchema>;
export type RefreshAccessParams = z.infer<typeof refereshAccessSchema>;
