import { Router } from 'express';
import { validateSchema } from '@/middlewares/schema-validator.middleware';
import { AuthController } from '@/controllers/auth.controller';
import { loginSchema, logoutSchema, registerSchema } from '@/schemas/auth.schema';
import { AuthService } from '@/services/auth.service';

const authRouter = Router();

const authService = new AuthService();

const authController = new AuthController(authService);

authRouter.post('/register', validateSchema(registerSchema), authController.register);

authRouter.post('/login', validateSchema(loginSchema), authController.login);

authRouter.post('/logout', validateSchema(logoutSchema), authController.logout);

export { authRouter };
