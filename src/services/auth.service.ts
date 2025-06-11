import argon2 from '@node-rs/argon2';
import { LoginParams, LogoutParams, RefreshAccessParams, RegisterParams } from '@/types/auth.type';

export class AuthService {
  constructor() { }

  async register(data: RegisterParams) {
    const password = data.password;
    const hashedPassword = await argon2.hash(password);
  }

  async login(data: LoginParams) { }

  async logout(data: LogoutParams) { }

  async refreshAccess(data: RefreshAccessParams) { }
}
