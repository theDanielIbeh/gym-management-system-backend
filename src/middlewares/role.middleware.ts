import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { RequestWithUser } from '@interfaces/auth.interface';
import { UserModel } from '@models/users.model';

interface MyTokenPayload {
  role: string;
}

export const checkRole = (requiredRole: string) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'Access denied, no token provided.' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as MyTokenPayload;
      const userRole = decoded.role;

      if (userRole !== requiredRole) {
        return res.status(403).json({ message: 'Access denied, insufficient permissions.' });
      }

      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };
};
