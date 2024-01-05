import { Router } from 'express';
import { PaymentController } from '@controllers/payments.controller';
import { CreatePaymentDto } from '@dtos/payments.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { checkRole } from '@/middlewares/role.middleware';

export class PaymentRoute implements Routes {
  public path = '/payment';
  public router = Router();
  public payment = new PaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.payment.getPayments);
    this.router.get(`${this.path}/:id`, this.payment.getPaymentById);
    this.router.post(`${this.path}`, checkRole('Superadmin'), ValidationMiddleware(CreatePaymentDto), this.payment.createPayment);
    this.router.delete(`${this.path}/:id`, checkRole('Superadmin'), this.payment.deletePayment);
  }
}
