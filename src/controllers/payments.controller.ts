import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Payment } from '@interfaces/payments.interface';
import { PaymentService } from '@services/payments.service';

export class PaymentController {
  public payment = Container.get(PaymentService);

  public getPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPaymentsData: Payment[] = await this.payment.findAllPayment();

      res.status(200).json({ data: findAllPaymentsData, message: 'found All' });
    } catch (error) {
      next(error);
    }
  };

  public getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId: string = req.params.id;
      const findOnePaymentData: Payment = await this.payment.findPaymentById(paymentId);

      res.status(200).json({ data: findOnePaymentData, message: 'found One' });
    } catch (error) {
      next(error);
    }
  };

  public createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentData: Payment = req.body;
      const createPaymentData: Payment = await this.payment.createPayment(paymentData);

      res.status(201).json({ data: createPaymentData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deletePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId: string = req.params.id;
      const deletePaymentData: Payment = await this.payment.deletePayment(paymentId);

      res.status(200).json({ data: deletePaymentData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
