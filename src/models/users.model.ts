import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

export const Roles = {
  User: 'User',
  Instructor: 'Instructor',
  Staff: 'Staff',
  Admin: 'Admin',
  Superadmin: 'Superadmin',
};

export const SubscriptionType = {
  Platinum: 'Platinum', // 12 months
  Gold: 'Gold', // 6 months
  Silver: 'Silver', // 3 months
  Bronze: 'Bronze', // 1 month
  Copper: 'Copper', // 2 weeks
  Basic: 'Basic', // 1 week
};

const UserSchema: Schema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
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
  image: {
    type: String,
  },
  branch: {
    type: String,
  },
  subscription_type: {
    type: String,
    enum: Object.values(SubscriptionType),
  },
});

export const UserModel = model<User & Document>('User', UserSchema);
