import { User } from './users.interface';

export interface Branch {
  _id?: string;
  name: string;
  location: string;
  admin: User;
  users: User[];
  equipment: string[];
  utility_cost: number;
  staff: User[];
}
