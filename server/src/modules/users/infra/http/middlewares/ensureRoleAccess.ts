import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

export default async function ensureRoleAccess(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const { role } = request.user;

  if (Number(role) === 2 || Number(role) === 3) {
    return next();
  }

  throw new AppError('Unauthorized!', 401);
}
