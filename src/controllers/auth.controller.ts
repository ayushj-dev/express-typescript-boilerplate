import { NextFunction, Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';

export class AuthController {

  constructor(private authService: AuthService) { }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.register(req.data);
    } catch (error) {
      next(error);
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.login(req.data);
    } catch (error) {
      next(error);
    }
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.logout(req.data);
    } catch (error) {
      next(error);
    }
  }

  refreshAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.refreshAccess(req.data);
    } catch (error) {
      next(error);
    }
  }
}
