import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/config';

export const generateAccessToken = (payload: object): string => jwt.sign(payload, CONFIG.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

export const generateRefreshToken = (payload: object): string => jwt.sign(payload, CONFIG.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '1h' });

export const verifyAccessToken = (token: string): any => jwt.verify(token, CONFIG.JWT_ACCESS_TOKEN_SECRET);

export const verifyRefreshToken = (token: string): any => jwt.verify(token, CONFIG.JWT_REFRESH_TOKEN_SECRET);
