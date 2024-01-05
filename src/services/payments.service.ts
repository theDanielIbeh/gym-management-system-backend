import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Payment } from '@interfaces/payments.interface';
import { PaymentModel } from '@models/payments.model';

@Service()
export class PaymentService {
  public async findAllPayment(): Promise<Payment[]> {
    const payments: Payment[] = await PaymentModel.find();
    return payments;
  }

  public async findPaymentById(paymentId: string): Promise<Payment> {
    const findPayment: Payment = await PaymentModel.findOne({ _id: paymentId });
    if (!findPayment) throw new HttpException(409, "Payment doesn't exist");

    return findPayment;
  }

  public async createPayment(paymentData: Payment): Promise<Payment> {
    const createPaymentData: Payment = await PaymentModel.create({ ...paymentData });

    return createPaymentData;
  }

  public async deletePayment(paymentId: string): Promise<Payment> {
    const deletePaymentById: Payment = await PaymentModel.findByIdAndDelete(paymentId);
    if (!deletePaymentById) throw new HttpException(409, "Payment doesn't exist");

    return deletePaymentById;
  }
}
