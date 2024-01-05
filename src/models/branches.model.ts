import { model, Schema, Document, Types } from 'mongoose';
import { Branch } from '@interfaces/branches.interface';

const BranchSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  admin: {
    type: Types.ObjectId,
    ref: 'User',
  },
  users: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
  equipment: {
    type: [String],
  },
  utility_cost: {
    type: Number,
  },
  staff: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
});

export const BranchModel = model<Branch & Document>('Branch', BranchSchema);
