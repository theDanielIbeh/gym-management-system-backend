import { model, Schema, Document, Types } from 'mongoose';
import { Payment } from '@/interfaces/payments.interface';

export const PaymentType = {
  Subscription: "Subscription",
  Salary: "Salary"
}
const PaymentSchema: Schema = new Schema({
  payment_type: {
    type: String,
    required: true,
    enum: Object.values(PaymentType)
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  payee: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  }
});

export const PaymentModel = model<Payment & Document>('Payment', PaymentSchema);
