import { NextFunction, Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';

export class AuthController {

  constructor(private authService: AuthService) { }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      await this.authService.register(req.data);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      await this.authService.login(req.data);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await this.authService.logout(req.data);
    } catch (error) {
      next(error);
    }
  }

  async refreshAccess(req: Request, res: Response, next: NextFunction) {
    try {
      await this.authService.refreshAccess(req.data);
    } catch (error) {
      next(error);
    }
  }
}
