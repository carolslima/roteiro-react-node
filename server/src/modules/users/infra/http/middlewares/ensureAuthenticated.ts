import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  provider_id: string;
  role: number;
}

export default function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  // Validation
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret, {
      algorithms: ['HS256'],
    }) as ITokenPayload;

    const { sub, provider_id, role } = decodedToken;

    request.user = {
      id: sub,
      provider_id,
      role,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
