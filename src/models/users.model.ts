import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const Roles = {
  User: 'User',
  Instructor: 'Instructor',
  Admin: 'Admin',
  Superadmin: 'Superadmin',
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
});

export const UserModel = model<User & Document>('User', UserSchema);
