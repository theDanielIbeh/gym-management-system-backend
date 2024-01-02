import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const Roles = {
  User: 'User',
  Instructor: 'Instructor',
  Admin: 'Admin',
  Superadmin: 'Superadmin',
};

const SubscriptionType = {
  Platinum: 'Platinum', // 12 months
  Gold: 'Gold', // 6 months
  Silver: 'Silver', // 3 months
  Bronze: 'Bronze', // 1 month
};

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(Roles),
    required: true,
    default: Roles.User,
  },
  branch: {
    type: String,
  },
  subscription_type: {
    type: String,
    enum: Object.values(SubscriptionType),
  }
});

export const UserModel = model<User & Document>('User', UserSchema);
