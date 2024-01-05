import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  _id: string;
  role: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
  role: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
