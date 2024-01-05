import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { SECRET_KEY } from '@config';
import { RequestWithUser } from '@interfaces/auth.interface';

interface MyTokenPayload {
  role: string;
}

export const checkRole = (...roles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'Access denied, no token provided.' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as MyTokenPayload;
      const userRole = decoded.role;

      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied, insufficient permissions.' });
      }

      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };
};
