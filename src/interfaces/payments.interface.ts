import { User } from "./users.interface";

export interface Payment {
    _id?: string;
    payment_type: string;
    amount: number;
    date: Date;
    payee: User
  }
  