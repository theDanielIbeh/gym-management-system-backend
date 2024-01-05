import { model, Schema, Document, Types } from 'mongoose';
import { Payment } from '@/interfaces/payments.interface';

export const PaymentType = {
  Subscription: 'Subscription',
  Salary: 'Salary',
  Utility: 'Utility',
};
const PaymentSchema: Schema = new Schema({
  payment_type: {
    type: String,
    required: true,
    enum: Object.values(PaymentType),
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  payee: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const PaymentModel = model<Payment & Document>('Payment', PaymentSchema);
